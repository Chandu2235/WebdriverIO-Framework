#!/usr/bin/env node

/**
 * Environment Validator Script
 * Validates that all required environment variables are configured
 */

import * as fs from 'fs';
import * as path from 'path';

const requiredEnvVars = {
  database: ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'],
  testrail: ['TESTRAIL_URL', 'TESTRAIL_USER', 'TESTRAIL_PASSWORD'],
  application: ['APP_URL'],
  optional: ['TEST_ENV', 'LOG_LEVEL', 'BROWSER_NAME', 'HEADLESS']
};

function validateEnvironment(): void {
  console.log('🔍 Validating environment configuration...\n');

  const envPath = path.join(process.cwd(), '.env');
  const envExamplePath = path.join(process.cwd(), '.env.example');

  // Check if .env file exists
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env file not found!');
    console.log('📝 Creating .env from .env.example...');

    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      console.log('✅ .env file created from .env.example');
      console.log('⚠️  Please update .env with your actual values!\n');
    } else {
      console.error('❌ .env.example not found either!');
      process.exit(1);
    }
  }

  // Load environment variables
  require('dotenv').config({ path: envPath });

  let missingVars: string[] = [];
  let missingSection: { [key: string]: string[] } = {};

  // Check required environment variables by section
  for (const [section, vars] of Object.entries(requiredEnvVars)) {
    if (section === 'optional') continue;

    missingSection[section] = [];

    for (const envVar of vars) {
      if (!process.env[envVar]) {
        missingVars.push(envVar);
        missingSection[section].push(envVar);
        console.error(`❌ Missing: ${envVar}`);
      } else {
        console.log(`✅ ${envVar} is configured`);
      }
    }
  }

  // Show optional variables status
  console.log('\n📋 Optional environment variables:');
  for (const envVar of requiredEnvVars.optional) {
    if (process.env[envVar]) {
      console.log(`✅ ${envVar} = ${process.env[envVar]}`);
    } else {
      console.log(`⚠️  ${envVar} not configured (using defaults)`);
    }
  }

  if (missingVars.length > 0) {
    console.error(`\n❌ Configuration incomplete! Missing ${missingVars.length} variables:`);
    for (const [section, vars] of Object.entries(missingSection)) {
      if (vars.length > 0) {
        console.error(`\n${section.toUpperCase()}: ${vars.join(', ')}`);
      }
    }
    console.error('\n📝 Please update .env with your values and try again.');
    process.exit(1);
  }

  // Validate specific values
  console.log('\n🔎 Validating configuration values...');

  // Validate URLs
  if (process.env.TESTRAIL_URL) {
    try {
      new URL(process.env.TESTRAIL_URL);
      console.log('✅ TESTRAIL_URL is a valid URL');
    } catch {
      console.error('❌ TESTRAIL_URL is not a valid URL');
      process.exit(1);
    }
  }

  if (process.env.APP_URL) {
    try {
      new URL(process.env.APP_URL);
      console.log('✅ APP_URL is a valid URL');
    } catch {
      console.error('❌ APP_URL is not a valid URL');
      process.exit(1);
    }
  }

  // Validate database port
  if (process.env.DB_PORT) {
    const port = parseInt(process.env.DB_PORT, 10);
    if (isNaN(port) || port < 1 || port > 65535) {
      console.error('❌ DB_PORT is not a valid port number (1-65535)');
      process.exit(1);
    }
  }

  console.log('\n✅ All environment variables are properly configured!\n');
  process.exit(0);
}

validateEnvironment();
