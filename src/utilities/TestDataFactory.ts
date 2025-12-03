/**
 * Test data factory for banking application
 */

export class TestDataFactory {
  /**
   * Valid customer credentials
   */
  static getValidCustomerCredentials() {
    return {
      customerName: 'Harry Potter',
      username: 'harryPotter',
      password: 'password123',
    };
  }

  /**
   * Valid manager credentials
   */
  static getValidManagerCredentials() {
    return {
      managerName: 'John Doe',
      username: 'john123',
      password: 'pass123',
    };
  }

  /**
   * Invalid credentials
   */
  static getInvalidCredentials() {
    return {
      username: 'invalid_user',
      password: 'invalid_password',
    };
  }

  /**
   * Sample customer list
   */
  static getCustomerList() {
    return [
      { id: 1, name: 'Harry Potter' },
      { id: 2, name: 'Ron Weasly' },
      { id: 3, name: 'Hermoine Granger' },
      { id: 4, name: 'Albus Dumbledore' },
      { id: 5, name: 'Lord Voldemort' },
    ];
  }

  /**
   * Sample account data
   */
  static getAccountData() {
    return [
      { accountNumber: '1001', type: 'Saving', balance: 5000 },
      { accountNumber: '1002', type: 'Checking', balance: 8500 },
      { accountNumber: '1003', type: 'Money Market', balance: 15000 },
    ];
  }

  /**
   * Sample deposit amounts
   */
  static getDepositAmounts() {
    return [100, 500, 1000, 5000, 10000];
  }

  /**
   * Sample withdrawal amounts
   */
  static getWithdrawalAmounts() {
    return [50, 200, 500, 1000, 5000];
  }

  /**
   * Sample transaction data
   */
  static getTransactionData() {
    return [
      { date: '2024-01-15', amount: 500, type: 'Debit' },
      { date: '2024-01-14', amount: 1000, type: 'Credit' },
      { date: '2024-01-13', amount: 250, type: 'Debit' },
      { date: '2024-01-12', amount: 2000, type: 'Credit' },
    ];
  }

  /**
   * Error messages
   */
  static getErrorMessages() {
    return {
      invalidCredentials: 'User or Password is wrong.',
      insufficientBalance: 'Transaction Failed. You can not withdraw amount more than the balance.',
      invalidAmount: 'Please check the amount.',
      fieldRequired: 'Please select an account.',
    };
  }

  /**
   * Success messages
   */
  static getSuccessMessages() {
    return {
      depositSuccess: 'Deposit Successful',
      withdrawalSuccess: 'Withdrawal Successful',
      transactionInitiated: 'Transaction Successful',
    };
  }
}
