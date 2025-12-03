import mysql from 'mysql2/promise';
import { Logger } from '../utilities/Logger';

/**
 * Database connection pool configuration
 */
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'banking_app_test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

/**
 * Database connection pool
 */
let pool: mysql.Pool;

/**
 * Initialize database connection pool
 */
export async function initializePool(): Promise<mysql.Pool> {
  try {
    pool = mysql.createPool(dbConfig);
    Logger.success('Database connection pool initialized');
    return pool;
  } catch (error) {
    Logger.error(`Failed to initialize connection pool: ${error}`);
    throw error;
  }
}

/**
 * Get a connection from the pool
 */
export async function getConnection(): Promise<mysql.PoolConnection> {
  try {
    if (!pool) {
      await initializePool();
    }
    const connection = await pool.getConnection();
    Logger.debug('Database connection acquired');
    return connection;
  } catch (error) {
    Logger.error(`Failed to get database connection: ${error}`);
    throw error;
  }
}

/**
 * Execute a query with parameters
 */
export async function executeQuery(
  sql: string,
  parameters: any[] = []
): Promise<any> {
  let connection;
  try {
    connection = await getConnection();
    Logger.debug(`Executing query: ${sql}`);
    const [results] = await connection.execute(sql, parameters);
    return results;
  } catch (error) {
    Logger.error(`Query execution failed: ${error}`);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

/**
 * Execute multiple queries in a transaction
 */
export async function executeTransaction(
  queries: Array<{ sql: string; parameters?: any[] }>
): Promise<void> {
  let connection;
  try {
    connection = await getConnection();
    await connection.beginTransaction();
    Logger.info('Transaction started');

    for (const query of queries) {
      Logger.debug(`Executing transaction query: ${query.sql}`);
      await connection.execute(query.sql, query.parameters || []);
    }

    await connection.commit();
    Logger.success('Transaction committed successfully');
  } catch (error) {
    if (connection) {
      await connection.rollback();
      Logger.warn('Transaction rolled back due to error');
    }
    Logger.error(`Transaction failed: ${error}`);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

/**
 * Close all connections in the pool
 */
export async function closePool(): Promise<void> {
  try {
    if (pool) {
      await pool.end();
      Logger.success('Database connection pool closed');
    }
  } catch (error) {
    Logger.error(`Failed to close connection pool: ${error}`);
    throw error;
  }
}

/**
 * Verify database connection
 */
export async function verifyConnection(): Promise<boolean> {
  try {
    const connection = await getConnection();
    await connection.ping();
    connection.release();
    Logger.success('Database connection verified');
    return true;
  } catch (error) {
    Logger.error(`Database connection verification failed: ${error}`);
    return false;
  }
}
