#!/usr/bin/env node

/**
 * Database Cleanup Script
 * Clears test data after test execution
 */

const mysql = require('mysql2/promise');
const { Logger } = require('../../utilities/Logger');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'banking_app_test',
};

async function cleanupDatabase() {
  let connection;
  try {
    Logger.info('🧹 Starting database cleanup...');

    connection = await mysql.createConnection(dbConfig);

    // Clear transaction data
    Logger.info('Clearing transactions...');
    await connection.execute('DELETE FROM transactions');

    // Reset account balances to original values
    Logger.info('Resetting account balances...');
    await connection.execute('DELETE FROM accounts');
    await connection.execute(`
      INSERT INTO accounts (customer_id, account_type, balance) VALUES
      (1, 'Savings', 50000),
      (1, 'Checking', 25000),
      (2, 'Savings', 35000),
      (3, 'Checking', 60000)
    `);

    // Clear old test results (older than 7 days)
    Logger.info('Clearing old test results...');
    await connection.execute(
      "DELETE FROM test_results WHERE executed_at < DATE_SUB(NOW(), INTERVAL 7 DAY)"
    );

    Logger.success('✅ Database cleanup completed successfully!');
    process.exit(0);
  } catch (error) {
    Logger.error(`Database cleanup failed: ${error}`);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

cleanupDatabase();
