# WebdriverIO Banking Framework - Copilot Instructions

## Project Overview
WebdriverIO POM Framework for Banking Application testing with comprehensive page objects, utilities, and test specifications.

## Architecture
- **Pattern**: Page Object Model (POM)
- **Framework**: WebdriverIO with TypeScript
- **Browser**: Chrome/Firefox
- **Application**: Global QA Banking Project

## Key Components

### Pages
- **BasePage**: Common methods for all pages
- **LoginPage**: Authentication functionality
- **CustomerDashboardPage**: Customer portal
- **AccountsPage**: Account listing and management
- **TransactionsPage**: Transaction history
- **DepositsPage**: Deposit operations
- **WithdrawalsPage**: Withdrawal operations

### Utilities
- **CommonUtils**: Helper functions (retry, wait, format)
- **Logger**: Colored logging utility
- **TestDataFactory**: Test data generation

### Tests
Located in `src/tests/specs/`:
- login.spec.ts
- dashboard.spec.ts
- accounts.spec.ts
- transactions.spec.ts
- deposits.spec.ts
- withdrawals.spec.ts

## Quick Commands

```powershell
# Install dependencies
npm install

# Run all tests
npm test

# Run specific browser
npm run test:chrome

# Run in headless mode
npm run test:headless

# Run in parallel
npm run test:parallel

# Generate Allure report
npm run report
```

## Configuration
- Config file: `wdio.conf.ts`
- TypeScript: `tsconfig.json`
- Dependencies: `package.json`

## Test Data
- Location: `test-data/testData.json`
- Factory: `src/utilities/TestDataFactory.ts`

## Reports
- Spec reports: `reports/`
- Allure reports: `allure-results/`

## Adding New Tests

1. Create page object in `src/pages/` if needed
2. Create test file in `src/tests/specs/`
3. Import page objects
4. Write test cases using Mocha + Chai
5. Run with `npm test`

## Best Practices
- Use page objects for all UI interactions
- Use utilities for common operations
- Use TestDataFactory for test data
- Keep tests independent
- Use meaningful test names
- Add appropriate waits
