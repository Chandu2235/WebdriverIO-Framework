-- Banking Application Test Database Schema
-- This schema is used for automated test data management

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  date_of_birth DATE,
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(50),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  account_status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by VARCHAR(100),
  updated_by VARCHAR(100)
);

-- Create Accounts Table
CREATE TABLE IF NOT EXISTS accounts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  account_number VARCHAR(50) NOT NULL UNIQUE,
  account_type ENUM('SAVINGS', 'CHECKING', 'MONEY_MARKET', 'CD') NOT NULL,
  account_name VARCHAR(255) NOT NULL,
  balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  currency VARCHAR(3) DEFAULT 'USD',
  account_status ENUM('ACTIVE', 'INACTIVE', 'FROZEN') DEFAULT 'ACTIVE',
  interest_rate DECIMAL(5, 3) DEFAULT 0.000,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_account_number (account_number)
);

-- Create Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  account_id INT NOT NULL,
  transaction_type ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'INTEREST', 'FEE') NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  description VARCHAR(255),
  transaction_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REVERSED') DEFAULT 'COMPLETED',
  reference_number VARCHAR(50),
  balance_after DECIMAL(15, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  INDEX idx_account_id (account_id),
  INDEX idx_transaction_date (transaction_date),
  INDEX idx_reference_number (reference_number)
);

-- Create Transfers Table
CREATE TABLE IF NOT EXISTS transfers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  from_account_id INT NOT NULL,
  to_account_id INT NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  transfer_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED') DEFAULT 'COMPLETED',
  description VARCHAR(255),
  reference_number VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (from_account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (to_account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  INDEX idx_from_account (from_account_id),
  INDEX idx_to_account (to_account_id),
  INDEX idx_reference_number (reference_number)
);

-- Create Test Results Table
CREATE TABLE IF NOT EXISTS test_results (
  id INT PRIMARY KEY AUTO_INCREMENT,
  test_case_id VARCHAR(50) NOT NULL,
  test_suite VARCHAR(100) NOT NULL,
  test_name VARCHAR(255) NOT NULL,
  test_status ENUM('PASSED', 'FAILED', 'SKIPPED', 'PENDING') NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  duration_ms INT,
  error_message LONGTEXT,
  assertion_errors LONGTEXT,
  screenshots LONGTEXT,
  browser_name VARCHAR(50),
  os_name VARCHAR(100),
  os_version VARCHAR(50),
  jenkins_build_number VARCHAR(50),
  testrail_run_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_test_case_id (test_case_id),
  INDEX idx_test_status (test_status),
  INDEX idx_jenkins_build (jenkins_build_number),
  INDEX idx_created_at (created_at)
);

-- Create Audit Log Table
CREATE TABLE IF NOT EXISTS audit_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id INT,
  old_values LONGTEXT,
  new_values LONGTEXT,
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  action_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_action_timestamp (action_timestamp)
);

-- Create Deposits Table
CREATE TABLE IF NOT EXISTS deposits (
  id INT PRIMARY KEY AUTO_INCREMENT,
  account_id INT NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  deposit_method ENUM('CASH', 'CHECK', 'WIRE_TRANSFER', 'ACH', 'MOBILE_DEPOSIT') NOT NULL,
  deposit_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  processing_date DATETIME,
  status ENUM('PENDING', 'PROCESSED', 'FAILED', 'RETURNED') DEFAULT 'PENDING',
  reference_number VARCHAR(50),
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  INDEX idx_account_id (account_id),
  INDEX idx_deposit_date (deposit_date),
  INDEX idx_status (status)
);

-- Create Withdrawals Table
CREATE TABLE IF NOT EXISTS withdrawals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  account_id INT NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  withdrawal_method ENUM('ATM', 'TELLER', 'ONLINE', 'MOBILE', 'CHECK') NOT NULL,
  withdrawal_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  processing_date DATETIME,
  status ENUM('PENDING', 'PROCESSED', 'FAILED', 'CANCELLED') DEFAULT 'PENDING',
  reference_number VARCHAR(50),
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  INDEX idx_account_id (account_id),
  INDEX idx_withdrawal_date (withdrawal_date),
  INDEX idx_status (status)
);
