<img width="1918" height="1077" alt="image" src="https://github.com/user-attachments/assets/2151c585-ed16-4a92-9cd8-f257ee4ee51b" />

<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/bea3af3e-adcc-456a-be74-0e37ec92b38c" />





# WebdriverIO POM Framework for Banking Application

A comprehensive Page Object Model (POM) automation framework for testing the Global QA Banking Application using WebdriverIO with TypeScript.

## 🏦 Application Under Test

- **URL**: [Banking Project](https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login)
- **Type**: Angular-based Banking Application
- **Features**: Customer & Manager authentication, Account management, Deposits, Withdrawals, Transactions

## 📁 Project Structure

```
banking-app-pom-framework/
├── src/
│   ├── pages/                 # Page Object Models
│   │   ├── BasePage.ts       # Base class with common methods
│   │   ├── LoginPage.ts      # Login page POM
│   │   ├── CustomerDashboardPage.ts
│   │   ├── AccountsPage.ts
│   │   ├── TransactionsPage.ts
│   │   ├── DepositsPage.ts
│   │   └── WithdrawalsPage.ts
│   ├── tests/
│   │   └── specs/            # Test specifications
│   │       ├── login.spec.ts
│   │       ├── dashboard.spec.ts
│   │       ├── accounts.spec.ts
│   │       ├── transactions.spec.ts
│   │       ├── deposits.spec.ts
│   │       └── withdrawals.spec.ts
│   └── utilities/            # Test utilities
│       ├── CommonUtils.ts    # Common helper functions
│       ├── Logger.ts         # Logging utility
│       └── TestDataFactory.ts # Test data factory
├── test-data/                # Test data files
│   └── testData.json
├── reports/                  # Test reports directory
├── wdio.conf.ts             # WebdriverIO configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies
└── README.md                # This file

```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Chrome/Firefox browser

### Installation

1. **Navigate to project directory**:
```powershell
cd "d:\WebdriverIO framework"
```

2. **Install dependencies**:
```powershell
npm install
```

3. **Verify installation**:
```powershell
npm list webdriverio
```

## ▶️ Running Tests

### Run all tests:
```powershell
npm test
```

### Run tests in specific browser:
```powershell
npm run test:chrome
npm run test:firefox
```

### Run tests in headless mode:
```powershell
npm run test:headless
```

### Run tests in parallel:
```powershell
npm run test:parallel
```

### Run with debug mode:
```powershell
npm run test:debug
```

### Generate Allure report:
```powershell
npm run report
```

## 📋 Test Coverage

### Login Tests (TC001-TC004)
- ✓ Verify login page is displayed
- ✓ Navigate to customer login
- ✓ Navigate to manager login
- ✓ Verify login form elements are visible

### Dashboard Tests (TC005-TC007)
- ✓ Verify customer can select account
- ✓ Verify logout button availability
- ✓ Verify navigation links visibility

### Accounts Tests (TC008-TC009)
- ✓ Verify accounts page structure
- ✓ Verify back button functionality

### Transactions Tests (TC010-TC011)
- ✓ Verify transactions page URL
- ✓ Verify reset button exists

### Deposits Tests (TC012-TC013)
- ✓ Verify deposit page structure
- ✓ Verify amount field exists

### Withdrawals Tests (TC014-TC015)
- ✓ Verify withdrawal page structure
- ✓ Verify withdrawal amount field exists

## 🏗️ Page Object Model Architecture

### BasePage
Contains common methods used across all page objects:
- `waitForElementVisible()` - Wait for element visibility
- `clickElement()` - Click on element
- `typeText()` - Enter text in input field
- `getText()` - Get element text
- `isElementDisplayed()` - Check element visibility
- And 20+ other common methods

### Specific Page Objects
Each page extends BasePage and contains:
- **Locators**: Private selectors for page elements
- **Page Methods**: Actions specific to that page
- **Navigation Methods**: Methods to navigate to related pages

## 🛠️ Utilities

### CommonUtils
- `generateRandomString()` - Generate random strings
- `generateRandomNumber()` - Generate random numbers
- `formatCurrency()` - Format numbers as currency
- `extractNumber()` - Extract numbers from strings
- `retry()` - Retry with exponential backoff

### Logger
Colored console logging with levels:
- `Logger.info()` - Info logs
- `Logger.success()` - Success logs
- `Logger.warn()` - Warning logs
- `Logger.error()` - Error logs
- `Logger.debug()` - Debug logs

### TestDataFactory
Factory for generating test data:
- `getValidCustomerCredentials()`
- `getValidManagerCredentials()`
- `getCustomerList()`
- `getAccountData()`
- `getErrorMessages()`

## 📊 Configuration

### wdio.conf.ts
- **Framework**: Mocha
- **Reporter**: Spec + Allure
- **Timeout**: 60 seconds per test
- **Max Instances**: 1 (configurable)
- **Base URL**: Banking Project URL

### Key Configuration Options
```typescript
maxInstances: 1              // Number of parallel instances
bail: 0                      // Continue on failure
waitforTimeout: 10000        // Element wait timeout
connectionRetryCount: 3      // Retry connection attempts
```

## 📝 Writing Tests

### Test Template
```typescript
import { expect } from 'chai';
import { LoginPage } from '../../pages/LoginPage';

describe('Test Suite', () => {
  let loginPage: LoginPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    await browser.url('https://...');
  });

  it('TC### - Test Description', async () => {
    // Arrange
    // Act
    await loginPage.clickElement(...);
    // Assert
    expect(true).to.be.true;
  });
});
```

## 🔍 Locator Strategy

The framework uses:
- **CSS Selectors**: Primary (fastest)
- **XPath**: For complex selections
- **ng-model/ng-click**: Angular-specific selectors

Example:
```typescript
private readonly userNameField = 'input[ng-model="loginCtrl.userId"]';
private readonly loginButton = 'button[type="submit"]';
```

## 🐛 Troubleshooting

### Tests not finding elements
1. Verify CSS selectors using browser DevTools
2. Check for dynamic element loading (use waitForElementVisible)
3. Check for iframe elements (use switchToFrame)

### WebdriverIO won't start
1. Ensure ChromeDriver is installed: `npm list chromedriver`
2. Check port 4444 is not in use
3. Verify browser installation

### Tests timing out
1. Increase `waitforTimeout` in wdio.conf.ts
2. Check application response time
3. Add explicit waits using `pause()`

## 📚 Best Practices

1. **Use Page Objects**: All UI interactions via page objects
2. **Avoid Hard Waits**: Use `waitForElementVisible()` instead of `pause()`
3. **Meaningful Assertions**: Use clear, specific expectations
4. **Test Isolation**: Each test should be independent
5. **Descriptive Test Names**: Clearly describe what test does
6. **DRY Principle**: Extract common code to utilities
7. **Data-Driven Tests**: Use TestDataFactory for test data

## 🔗 Useful Resources

- [WebdriverIO Documentation](https://webdriver.io/)
- [WebdriverIO Best Practices](https://webdriver.io/docs/bestpractices)
- [Chai Assertions](https://www.chaijs.com/api/)
- [Banking Application](https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login)

## 🎯 Next Steps

1. Add more test cases for comprehensive coverage
2. Implement Visual Testing using WebdriverIO
3. Add API testing alongside UI automation
4. Integrate with CI/CD pipeline (Jenkins, GitHub Actions)
5. Add Performance testing
6. Implement Database validation

## 📄 License

ISC

## ✍️ Author

Created for comprehensive testing of Angular-based Banking Application

---

**Happy Testing! 🚀**
