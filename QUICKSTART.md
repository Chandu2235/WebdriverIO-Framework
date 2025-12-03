# WebdriverIO Banking Framework - Quick Start Guide

## 🎯 Project Successfully Created!

Your WebdriverIO POM (Page Object Model) framework for banking application testing is ready to use.

## 📦 What's Included

✅ **7 Page Objects** with comprehensive methods
✅ **6 Test Spec Files** with 15+ test cases
✅ **3 Utility Classes** for common functionality
✅ **Complete TypeScript Configuration** 
✅ **WebdriverIO Configuration** for Chrome/Firefox
✅ **Allure & Spec Reporters** pre-configured
✅ **Test Data Factory** for managing test data
✅ **Colored Logger Utility** for better readability

## 🚀 Getting Started in 3 Steps

### Step 1: Navigate to Project Directory
```powershell
cd "d:\WebdriverIO framework"
```

### Step 2: Run Tests
```powershell
# Run all tests
npm test

# Run specific browser
npm run test:chrome

# Run in headless mode
npm run test:headless
```

### Step 3: View Reports
Reports will be generated in:
- **Spec Reports**: `./reports/`
- **Allure Reports**: `./allure-results/`

## 📂 Project Structure Overview

```
src/
├── pages/              → Page Objects (7 files)
│   ├── BasePage.ts     → Base class with 25+ common methods
│   ├── LoginPage.ts
│   ├── CustomerDashboardPage.ts
│   ├── AccountsPage.ts
│   ├── TransactionsPage.ts
│   ├── DepositsPage.ts
│   └── WithdrawalsPage.ts
├── tests/specs/        → Test Specifications (6 files)
│   ├── login.spec.ts
│   ├── dashboard.spec.ts
│   ├── accounts.spec.ts
│   ├── transactions.spec.ts
│   ├── deposits.spec.ts
│   └── withdrawals.spec.ts
└── utilities/          → Helper Utilities (3 files)
    ├── CommonUtils.ts  → 10+ utility functions
    ├── Logger.ts       → Colored logging
    └── TestDataFactory.ts → Test data generation

test-data/
└── testData.json       → Test data file

Configuration Files:
├── wdio.conf.ts        → WebdriverIO configuration
├── tsconfig.json       → TypeScript configuration
├── package.json        → Dependencies & scripts
├── .editorconfig       → Editor settings
├── .gitignore          → Git ignore rules
└── README.md           → Full documentation
```

## 🧪 Test Categories

### Login Tests (4 tests)
- Verify login page display
- Navigate to customer login
- Navigate to manager login
- Verify form elements

### Dashboard Tests (3 tests)
- Select customer account
- Verify logout button
- Verify navigation links

### Accounts Tests (2 tests)
- Verify page structure
- Verify back button

### Transactions Tests (2 tests)
- Verify page URL
- Verify reset button

### Deposits & Withdrawals Tests (4 tests)
- Verify page structure
- Verify input fields

## 🛠️ Useful Commands

```powershell
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in Chrome
npm run test:chrome

# Run tests in Firefox
npm run test:firefox

# Run in headless mode
npm run test:headless

# Run tests in parallel (4 instances)
npm run test:parallel

# Run with debugging
npm run test:debug

# Generate Allure report
npm run report
```

## 📝 Key Classes Overview

### BasePage.ts (25+ Methods)
Common methods available to all page objects:
- `waitForElementVisible()` - Wait for element visibility
- `clickElement()` - Click element
- `typeText()` - Enter text
- `getText()` - Get element text
- `isElementDisplayed()` - Check visibility
- And 20+ more...

### TestDataFactory.ts
Pre-configured test data for:
- Valid customer credentials
- Valid manager credentials
- Customer list
- Account data
- Transaction data
- Error messages
- Success messages

### Logger.ts
Color-coded logging:
- `Logger.info()` - Info (Cyan)
- `Logger.success()` - Success (Green)
- `Logger.warn()` - Warning (Yellow)
- `Logger.error()` - Error (Red)
- `Logger.debug()` - Debug (Blue)

## 🔧 Configuration Details

### Browser Configuration
- **Default**: Chrome
- **Supported**: Chrome, Firefox
- **Mode**: Normal/Headless
- **Instance Count**: 1 (configurable)

### Timeouts
- Element Wait: 10 seconds
- Test Timeout: 60 seconds
- Connection Retry: 120 seconds

### Reporters
- Spec Reporter (terminal output)
- Allure Reporter (HTML reports)

## 🎨 Writing Your First Test

```typescript
import { expect } from 'chai';
import { LoginPage } from '../../pages/LoginPage';

describe('My Test Suite', () => {
  let loginPage: LoginPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    await browser.url('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  });

  it('TC### - My Test Case', async () => {
    // Arrange
    const credentials = TestDataFactory.getValidCustomerCredentials();
    
    // Act
    await loginPage.loginAsCustomer(credentials.username, credentials.password);
    
    // Assert
    expect(await loginPage.isLoginFormDisplayed()).to.be.false;
  });
});
```

## 📚 Adding New Page Objects

1. Create new file in `src/pages/MyPage.ts`
2. Extend `BasePage`
3. Define locators as private properties
4. Add page-specific methods
5. Export the class

```typescript
import { BasePage } from './BasePage';

export class MyPage extends BasePage {
  private readonly submitButton = 'button[type="submit"]';
  
  async clickSubmit(): Promise<void> {
    await this.clickElement(this.submitButton);
  }
}
```

## 🐛 Troubleshooting

### Tests not running?
1. Check if dependencies are installed: `npm list webdriverio`
2. Verify Node.js is installed: `node --version`
3. Check for port conflicts (port 4444)

### Elements not found?
1. Use browser DevTools to verify selectors
2. Add explicit waits: `waitForElementVisible()`
3. Check for iframe elements

### Tests timing out?
1. Increase timeout in `wdio.conf.ts`
2. Add explicit waits
3. Check application response

## 📖 Documentation

For detailed documentation, see:
- `README.md` - Complete guide
- `.github/copilot-instructions.md` - Framework instructions
- Individual test files - Example test patterns

## 🌐 Application Under Test

**URL**: https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login

**Features Available**:
- Customer & Manager Login
- Account Management
- Deposits & Withdrawals
- Transaction History
- Balance Checking

## ✨ Next Steps

1. **Run existing tests**: `npm test`
2. **Review page objects** in `src/pages/`
3. **Add more test cases** following the pattern
4. **Integrate with CI/CD** (Jenkins, GitHub Actions)
5. **Add API testing** alongside UI tests
6. **Implement visual testing**

## 📞 Need Help?

Refer to:
- WebdriverIO Docs: https://webdriver.io/
- Chai Assertions: https://www.chaijs.com/
- Mocha Testing: https://mochajs.org/

---

**Happy Testing! 🎉**

Framework created with WebdriverIO 8.27.0 & TypeScript 5.3.0
