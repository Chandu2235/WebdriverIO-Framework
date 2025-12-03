-- Test Data for Banking Application
-- This file contains sample data for automated testing

-- Insert Test Users
INSERT INTO users (username, password, first_name, last_name, email, phone, date_of_birth, address, city, state, postal_code, country, account_status, created_by, updated_by) VALUES
('testuser1', 'test@123', 'Test', 'User One', 'testuser1@example.com', '1234567890', '1990-01-15', '123 Main St', 'New York', 'NY', '10001', 'USA', 'ACTIVE', 'SYSTEM', 'SYSTEM'),
('testuser2', 'test@456', 'Test', 'User Two', 'testuser2@example.com', '1234567891', '1992-03-20', '456 Oak Ave', 'Los Angeles', 'CA', '90001', 'USA', 'ACTIVE', 'SYSTEM', 'SYSTEM'),
('testuser3', 'test@789', 'Test', 'User Three', 'testuser3@example.com', '1234567892', '1988-05-10', '789 Pine Rd', 'Chicago', 'IL', '60601', 'USA', 'ACTIVE', 'SYSTEM', 'SYSTEM'),
('testuser4', 'test@999', 'Test', 'User Four', 'testuser4@example.com', '1234567893', '1995-07-22', '321 Elm St', 'Houston', 'TX', '77001', 'USA', 'ACTIVE', 'SYSTEM', 'SYSTEM'),
('testuser5', 'test@555', 'Test', 'User Five', 'testuser5@example.com', '1234567894', '1991-09-30', '654 Maple Dr', 'Phoenix', 'AZ', '85001', 'USA', 'ACTIVE', 'SYSTEM', 'SYSTEM');

-- Insert Test Accounts (assuming user_ids 1-5)
INSERT INTO accounts (user_id, account_number, account_type, account_name, balance, currency, account_status, interest_rate, created_by, updated_by) VALUES
(1, '1001234567', 'SAVINGS', 'Primary Savings Account', 5000.00, 'USD', 'ACTIVE', 0.015, 'SYSTEM', 'SYSTEM'),
(1, '1001234568', 'CHECKING', 'Primary Checking Account', 2500.00, 'USD', 'ACTIVE', 0.000, 'SYSTEM', 'SYSTEM'),
(2, '1002234567', 'SAVINGS', 'Test Savings Account', 10000.00, 'USD', 'ACTIVE', 0.015, 'SYSTEM', 'SYSTEM'),
(2, '1002234568', 'MONEY_MARKET', 'Money Market Account', 50000.00, 'USD', 'ACTIVE', 0.045, 'SYSTEM', 'SYSTEM'),
(3, '1003234567', 'CHECKING', 'Test Checking Account', 3000.00, 'USD', 'ACTIVE', 0.000, 'SYSTEM', 'SYSTEM'),
(3, '1003234568', 'CD', 'Certificate of Deposit', 100000.00, 'USD', 'ACTIVE', 0.050, 'SYSTEM', 'SYSTEM'),
(4, '1004234567', 'SAVINGS', 'Savings Account', 15000.00, 'USD', 'ACTIVE', 0.015, 'SYSTEM', 'SYSTEM'),
(5, '1005234567', 'CHECKING', 'Checking Account', 5500.00, 'USD', 'ACTIVE', 0.000, 'SYSTEM', 'SYSTEM');

-- Insert Sample Transactions
INSERT INTO transactions (account_id, transaction_type, amount, description, transaction_date, status, reference_number, balance_after) VALUES
(1, 'DEPOSIT', 1000.00, 'Initial Deposit', '2024-01-15 09:00:00', 'COMPLETED', 'TRN-20240115-001', 6000.00),
(1, 'WITHDRAWAL', 500.00, 'ATM Withdrawal', '2024-01-16 14:30:00', 'COMPLETED', 'TRN-20240116-001', 5500.00),
(2, 'DEPOSIT', 2000.00, 'Direct Deposit - Salary', '2024-01-17 08:00:00', 'COMPLETED', 'TRN-20240117-001', 4500.00),
(3, 'WITHDRAWAL', 1500.00, 'Online Transfer', '2024-01-18 10:15:00', 'COMPLETED', 'TRN-20240118-001', 8500.00),
(4, 'INTEREST', 225.00, 'Monthly Interest', '2024-01-20 00:00:00', 'COMPLETED', 'INT-20240120-001', 50225.00),
(2, 'TRANSFER', 1000.00, 'Transfer from Savings', '2024-01-21 11:00:00', 'COMPLETED', 'TRN-20240121-001', 3500.00),
(1, 'DEPOSIT', 500.00, 'Mobile Check Deposit', '2024-01-22 15:45:00', 'COMPLETED', 'TRN-20240122-001', 6000.00),
(3, 'FEE', 25.00, 'Monthly Account Fee', '2024-01-25 00:00:00', 'COMPLETED', 'FEE-20240125-001', 8475.00);

-- Insert Sample Transfers
INSERT INTO transfers (from_account_id, to_account_id, amount, transfer_date, status, description, reference_number) VALUES
(1, 2, 1000.00, '2024-01-21 11:00:00', 'COMPLETED', 'Test Transfer from Savings to Checking', 'TRNF-20240121-001'),
(3, 4, 5000.00, '2024-01-22 14:30:00', 'COMPLETED', 'Test Transfer to Money Market', 'TRNF-20240122-001');

-- Insert Sample Deposits
INSERT INTO deposits (account_id, amount, deposit_method, deposit_date, processing_date, status, reference_number, description) VALUES
(1, 1000.00, 'CASH', '2024-01-15 09:00:00', '2024-01-15 09:15:00', 'PROCESSED', 'DEP-20240115-001', 'Cash Deposit at Branch'),
(2, 2000.00, 'CHECK', '2024-01-17 08:00:00', '2024-01-19 08:00:00', 'PROCESSED', 'DEP-20240117-001', 'Check Deposit'),
(3, 500.00, 'MOBILE_DEPOSIT', '2024-01-22 15:45:00', '2024-01-22 20:00:00', 'PROCESSED', 'DEP-20240122-001', 'Mobile Check Deposit'),
(5, 3000.00, 'WIRE_TRANSFER', '2024-01-23 10:00:00', '2024-01-23 14:00:00', 'PROCESSED', 'DEP-20240123-001', 'Wire Transfer Received');

-- Insert Sample Withdrawals
INSERT INTO withdrawals (account_id, amount, withdrawal_method, withdrawal_date, processing_date, status, reference_number, description) VALUES
(1, 500.00, 'ATM', '2024-01-16 14:30:00', '2024-01-16 14:31:00', 'PROCESSED', 'WD-20240116-001', 'ATM Withdrawal'),
(2, 1000.00, 'TELLER', '2024-01-20 09:00:00', '2024-01-20 09:15:00', 'PROCESSED', 'WD-20240120-001', 'Teller Withdrawal'),
(3, 1500.00, 'ONLINE', '2024-01-18 10:15:00', '2024-01-18 10:30:00', 'PROCESSED', 'WD-20240118-001', 'Online Transfer Withdrawal'),
(4, 2000.00, 'CHECK', '2024-01-24 11:00:00', NULL, 'PENDING', 'WD-20240124-001', 'Check Request');
