import {
  initializePool,
  executeQuery,
  executeTransaction,
  verifyConnection,
  closePool,
} from './DatabaseClient';
import { Logger } from '../utilities/Logger';

/**
 * Setup test data in database
 */
export async function setupTestData(): Promise<void> {
  try {
    Logger.info('Setting up test data...');

    const queries = [
      {
        sql: `INSERT INTO customers (customer_id, first_name, last_name, email) 
              VALUES (?, ?, ?, ?)`,
        parameters: [1, 'Harry', 'Potter', 'harry@hogwarts.com'],
      },
      {
        sql: `INSERT INTO customers (customer_id, first_name, last_name, email) 
              VALUES (?, ?, ?, ?)`,
        parameters: [2, 'Ron', 'Weasly', 'ron@hogwarts.com'],
      },
      {
        sql: `INSERT INTO accounts (account_id, customer_id, account_type, balance) 
              VALUES (?, ?, ?, ?)`,
        parameters: [1001, 1, 'Savings', 50000],
      },
      {
        sql: `INSERT INTO accounts (account_id, customer_id, account_type, balance) 
              VALUES (?, ?, ?, ?)`,
        parameters: [1002, 1, 'Checking', 25000],
      },
    ];

    await executeTransaction(queries);
    Logger.success('Test data setup completed');
  } catch (error) {
    Logger.error(`Test data setup failed: ${error}`);
    throw error;
  }
}

/**
 * Clear all test data from database
 */
export async function clearTestData(): Promise<void> {
  try {
    Logger.info('Clearing test data...');

    const tables = ['transactions', 'accounts', 'customers'];

    for (const table of tables) {
      await executeQuery(`DELETE FROM ${table}`);
      Logger.debug(`Cleared ${table} table`);
    }

    Logger.success('Test data cleared');
  } catch (error) {
    Logger.error(`Test data cleanup failed: ${error}`);
    throw error;
  }
}

/**
 * Get customer by ID
 */
export async function getCustomer(customerId: number): Promise<any> {
  try {
    const result = await executeQuery(
      'SELECT * FROM customers WHERE customer_id = ?',
      [customerId]
    );
    return result[0] || null;
  } catch (error) {
    Logger.error(`Failed to fetch customer: ${error}`);
    throw error;
  }
}

/**
 * Get account by ID
 */
export async function getAccount(accountId: number): Promise<any> {
  try {
    const result = await executeQuery(
      'SELECT * FROM accounts WHERE account_id = ?',
      [accountId]
    );
    return result[0] || null;
  } catch (error) {
    Logger.error(`Failed to fetch account: ${error}`);
    throw error;
  }
}

/**
 * Update account balance
 */
export async function updateBalance(
  accountId: number,
  newBalance: number
): Promise<void> {
  try {
    await executeQuery('UPDATE accounts SET balance = ? WHERE account_id = ?', [
      newBalance,
      accountId,
    ]);
    Logger.debug(`Updated balance for account ${accountId}`);
  } catch (error) {
    Logger.error(`Failed to update balance: ${error}`);
    throw error;
  }
}

/**
 * Log transaction in database
 */
export async function logTransaction(
  accountId: number,
  type: string,
  amount: number
): Promise<void> {
  try {
    await executeQuery(
      `INSERT INTO transactions (account_id, transaction_type, amount, transaction_date) 
       VALUES (?, ?, ?, NOW())`,
      [accountId, type, amount]
    );
    Logger.debug(`Logged ${type} transaction for account ${accountId}`);
  } catch (error) {
    Logger.error(`Failed to log transaction: ${error}`);
    throw error;
  }
}

export {
  initializePool,
  executeQuery,
  executeTransaction,
  verifyConnection,
  closePool,
};
