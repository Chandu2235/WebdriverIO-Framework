# Database Integration Guide

## Overview
This guide explains how to integrate your testing framework with a MySQL database for test data management, validation, and result tracking.

## Prerequisites

- MySQL 8.0+
- mysql2/promise npm package (included in dependencies)
- Database credentials (host, user, password, database name)

## Setup

### 1. Database Connection Configuration

Set environment variables:

```bash
# Windows (PowerShell)
$env:DB_HOST = "localhost"
$env:DB_USER = "root"
$env:DB_PASSWORD = "your_password"
$env:DB_NAME = "banking_app_test"

# Linux/Mac
export DB_HOST="localhost"
export DB_USER="root"
export DB_PASSWORD="your_password"
export DB_NAME="banking_app_test"
```

Or create a `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=banking_app_test
```

### 2. Database Initialization

Run setup script:
```bash
npm run db:setup
```

This creates:
- Database (if not exists)
- Tables:
  - `customers` - Customer information
  - `accounts` - Account details
  - `transactions` - Transaction history
  - `test_results` - Test execution results

### 3. Database Schema

#### Customers Table
```sql
CREATE TABLE customers (
  customer_id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Accounts Table
```sql
CREATE TABLE accounts (
  account_id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  account_type VARCHAR(50),
  balance DECIMAL(15, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);
```

#### Transactions Table
```sql
CREATE TABLE transactions (
  transaction_id INT PRIMARY KEY AUTO_INCREMENT,
  account_id INT NOT NULL,
  transaction_type VARCHAR(20),
  amount DECIMAL(15, 2),
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE
);
```

#### Test Results Table
```sql
CREATE TABLE test_results (
  test_id INT PRIMARY KEY AUTO_INCREMENT,
  test_name VARCHAR(255),
  status VARCHAR(20),
  execution_time INT,
  error_message TEXT,
  executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Usage in Tests

### Import Database Helper
```typescript
import { 
  setupTestData, 
  clearTestData, 
  getCustomer, 
  getAccount, 
  updateBalance, 
  logTransaction 
} from '../database/DatabaseHelper';
```

### Example Test with Database
```typescript
describe('Banking Tests with Database', () => {
  before(async () => {
    // Setup test data
    await setupTestData();
  });

  after(async () => {
    // Cleanup test data
    await clearTestData();
  });

  it('TC001 - Verify customer balance after deposit', async () => {
    // Get customer from database
    const customer = await getCustomer(1);
    expect(customer.first_name).to.equal('Harry');

    // Get account
    const account = await getAccount(1001);
    const initialBalance = account.balance;

    // Perform UI action (e.g., deposit)
    await depositPage.makeDeposit('1001', '5000');

    // Verify database was updated
    const updatedAccount = await getAccount(1001);
    expect(updatedAccount.balance).to.equal(initialBalance + 5000);

    // Log transaction
    await logTransaction(1001, 'deposit', 5000);
  });
});
```

## Database Helper Functions

### setupTestData()
Inserts sample data into database
```typescript
await setupTestData();
```

### clearTestData()
Clears all test data
```typescript
await clearTestData();
```

### getCustomer(customerId)
Retrieves customer information
```typescript
const customer = await getCustomer(1);
// { customer_id: 1, first_name: 'Harry', last_name: 'Potter', ... }
```

### getAccount(accountId)
Retrieves account details
```typescript
const account = await getAccount(1001);
// { account_id: 1001, customer_id: 1, account_type: 'Savings', balance: 50000 }
```

### updateBalance(accountId, newBalance)
Updates account balance
```typescript
await updateBalance(1001, 75000);
```

### logTransaction(accountId, type, amount)
Logs transaction in database
```typescript
await logTransaction(1001, 'deposit', 5000);
```

### executeQuery(sql, parameters)
Execute custom queries
```typescript
const result = await executeQuery(
  'SELECT * FROM accounts WHERE balance > ?',
  [50000]
);
```

### executeTransaction(queries)
Execute multiple queries in transaction
```typescript
await executeTransaction([
  {
    sql: 'UPDATE accounts SET balance = balance - ? WHERE account_id = ?',
    parameters: [1000, 1001]
  },
  {
    sql: 'UPDATE accounts SET balance = balance + ? WHERE account_id = ?',
    parameters: [1000, 1002]
  }
]);
```

## Database Management Scripts

### Database Validation
Validates database connection:
```bash
npm run db:validate
```

### Database Setup
Initializes database with schema and sample data:
```bash
npm run db:setup
```

### Database Cleanup
Clears test data after tests:
```bash
npm run db:cleanup
```

## Before/After Hooks

### Global Database Setup (in wdio.conf.ts)
```typescript
before: async function() {
  const { initializePool } = require('../database/DatabaseClient');
  await initializePool();
},

after: async function() {
  const { closePool } = require('../database/DatabaseClient');
  await closePool();
}
```

### Suite-Level Setup
```typescript
describe('Banking Operations', () => {
  before(async () => {
    await setupTestData();
  });

  after(async () => {
    await clearTestData();
  });

  // Tests here
});
```

## Connection Pool Management

The framework uses connection pooling for efficiency:
- **Max Connections**: 10
- **Queue Limit**: 0 (unlimited queue)
- **Wait for Connections**: true

Adjust in `DatabaseClient.ts` if needed:
```typescript
const dbConfig = {
  connectionLimit: 10,  // Increase for more concurrent connections
  queueLimit: 0,        // 0 = unlimited queue
};
```

## Error Handling

### Database Connection Error
```typescript
try {
  const connection = await getConnection();
  // Use connection
} catch (error) {
  Logger.error(`Connection failed: ${error.message}`);
  // Handle error
}
```

### Query Execution Error
```typescript
try {
  const results = await executeQuery('SELECT * FROM customers');
} catch (error) {
  Logger.error(`Query failed: ${error.message}`);
  throw error;
}
```

### Transaction Rollback
```typescript
try {
  await executeTransaction([/* queries */]);
} catch (error) {
  Logger.warn('Transaction rolled back');
  // Handle rollback
}
```

## Data Validation

### Verify Data Exists
```typescript
const customer = await getCustomer(1);
if (!customer) {
  throw new Error('Customer not found');
}
```

### Verify Balance Update
```typescript
const beforeBalance = (await getAccount(1001)).balance;
// Perform operation
const afterBalance = (await getAccount(1001)).balance;
expect(afterBalance).to.equal(beforeBalance + depositAmount);
```

## Cleanup Strategies

### Per-Test Cleanup
```typescript
afterEach(async () => {
  await executeQuery('DELETE FROM transactions');
});
```

### Per-Suite Cleanup
```typescript
after(async () => {
  await clearTestData();
});
```

### Scheduled Cleanup
Use database cleanup script in Jenkins:
```bash
npm run db:cleanup
```

## Performance Optimization

### Use Transactions
For related operations, use transactions to ensure atomicity:
```typescript
await executeTransaction([
  { sql: 'UPDATE accounts SET balance = balance - ? WHERE account_id = ?', 
    parameters: [1000, 1001] },
  { sql: 'INSERT INTO transactions (account_id, amount) VALUES (?, ?)', 
    parameters: [1001, 1000] }
]);
```

### Batch Inserts
For multiple inserts:
```typescript
const values = customers.map(c => `('${c.id}', '${c.name}')`).join(',');
await executeQuery(`INSERT INTO customers VALUES ${values}`);
```

### Use Connection Pool
The framework automatically uses connection pooling for better performance.

## Troubleshooting

### Issue: Connection Timeout
```
Error: connect ECONNREFUSED
```

**Solution:**
- Check MySQL is running: `mysql -u root -p`
- Verify host/port: `DB_HOST=localhost`
- Check firewall rules

### Issue: Access Denied
```
Error: Access denied for user 'root'@'localhost'
```

**Solution:**
- Verify credentials in environment variables
- Check MySQL user permissions
- Ensure user has access to database

### Issue: Database Not Found
```
Error: Unknown database 'banking_app_test'
```

**Solution:**
- Run `npm run db:setup` to create database
- Check database name in environment variables

### Issue: Query Timeout
```
Error: Query takes too long
```

**Solution:**
- Add indexes to frequently queried columns
- Optimize query logic
- Increase connection timeout in config

## Best Practices

1. **Always Use Connection Pooling** - Don't create individual connections
2. **Cleanup After Tests** - Run `db:cleanup` to reset data
3. **Use Transactions** - For related updates, use transactions
4. **Validate Data** - Verify database state before/after operations
5. **Handle Errors** - Implement proper error handling
6. **Log Operations** - Use Logger for database operations
7. **Limit Query Results** - Use WHERE clauses efficiently
8. **Regular Backups** - Backup test database periodically

## Additional Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [mysql2 npm package](https://github.com/sidorares/node-mysql2)
- [SQL Performance Tips](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)

---

**For more information, see the main README.md and framework documentation.**
