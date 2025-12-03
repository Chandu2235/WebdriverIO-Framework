#!/usr/bin/env node

/**
 * Database Setup Script
 * Initializes test database with schema and sample data
 */

const mysql = require('mysql2/promise');
const { Logger } = require('../../utilities/Logger');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true,
};

async function setupDatabase() {
  let connection;
  try {
    Logger.info('🔄 Starting database setup...');

    // Create initial connection without database
    connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      multipleStatements: true,
    });

    const dbName = process.env.DB_NAME || 'banking_app_test';

    // Create database
    Logger.info(`Creating database: ${dbName}`);
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName}`);

    // Use the database
    await connection.execute(`USE ${dbName}`);

    // Create tables
    Logger.info('Creating database tables...');
    const schema = `
      CREATE TABLE IF NOT EXISTS customers (
        customer_id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE,
        phone VARCHAR(20),
        address VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS accounts (
        account_id INT PRIMARY KEY AUTO_INCREMENT,
        customer_id INT NOT NULL,
        account_type VARCHAR(50),
        balance DECIMAL(15, 2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS transactions (
        transaction_id INT PRIMARY KEY AUTO_INCREMENT,
        account_id INT NOT NULL,
        transaction_type VARCHAR(20),
        amount DECIMAL(15, 2),
        transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS test_results (
        test_id INT PRIMARY KEY AUTO_INCREMENT,
        test_name VARCHAR(255),
        status VARCHAR(20),
        execution_time INT,
        error_message TEXT,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await connection.execute(schema);
    Logger.success('✅ Database tables created successfully');

    // Insert sample data
    Logger.info('Inserting sample data...');
    const sampleData = `
      INSERT INTO customers (first_name, last_name, email, phone) VALUES
      ('Harry', 'Potter', 'harry@hogwarts.com', '1001'),
      ('Ron', 'Weasly', 'ron@hogwarts.com', '1002'),
      ('Hermoine', 'Granger', 'hermoine@hogwarts.com', '1003');

      INSERT INTO accounts (customer_id, account_type, balance) VALUES
      (1, 'Savings', 50000),
      (1, 'Checking', 25000),
      (2, 'Savings', 35000),
      (3, 'Checking', 60000);
    `;

    await connection.execute(sampleData);
    Logger.success('✅ Sample data inserted successfully');

    Logger.success('✅ Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    Logger.error(`Database setup failed: ${error}`);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
