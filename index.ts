/**
 * WebdriverIO Banking Framework
 * Main entry point for the framework
 * 
 * This framework provides:
 * - 7 Page Object Models for different application pages
 * - 6 Test Specification files with 15+ test cases
 * - Complete utility functions and logging
 * - Test data factory for managing test data
 */

// Export all page objects
export { BasePage } from './src/pages/BasePage';
export { LoginPage } from './src/pages/LoginPage';
export { CustomerDashboardPage } from './src/pages/CustomerDashboardPage';
export { AccountsPage } from './src/pages/AccountsPage';
export { TransactionsPage } from './src/pages/TransactionsPage';
export { DepositsPage } from './src/pages/DepositsPage';
export { WithdrawalsPage } from './src/pages/WithdrawalsPage';

// Export utilities
export * from './src/utilities/CommonUtils';
export { Logger } from './src/utilities/Logger';
export { TestDataFactory } from './src/utilities/TestDataFactory';
