#!/usr/bin/env node

/**
 * Database Validator Script
 * Validates database connection before running tests
 */

import { verifyConnection, closePool } from '../database/DatabaseClient';
import { Logger } from '../utilities/Logger';

async function validateDatabase(): Promise<void> {
  try {
    Logger.info('🗄️ Starting database validation...');

    const isConnected = await verifyConnection();

    if (isConnected) {
      Logger.success('✅ Database connection validated successfully');
      process.exit(0);
    } else {
      Logger.error('❌ Database validation failed');
      process.exit(1);
    }
  } catch (error) {
    Logger.error(`Database validation error: ${error}`);
    process.exit(1);
  } finally {
    await closePool();
  }
}

validateDatabase();
