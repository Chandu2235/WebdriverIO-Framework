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
WebdriverIO Framework/
├── src/
│   ├── pages/                      # 7 Page Objects
│   │   ├── BasePage.ts            # Base with 25+ methods
│   │   ├── LoginPage.ts
│   │   ├── CustomerDashboardPage.ts
│   │   ├── AccountsPage.ts
│   │   ├── TransactionsPage.ts
│   │   ├── DepositsPage.ts
│   │   └── WithdrawalsPage.ts
│   ├── tests/specs/                # 7 Test Suites (18 tests)
│   │   ├── login.spec.ts          # 4 tests
│   │   ├── dashboard.spec.ts      # 3 tests
│   │   ├── accounts.spec.ts       # 2 tests
│   │   ├── transactions.spec.ts   # 2 tests
│   │   ├── deposits.spec.ts       # 2 tests
│   │   ├── withdrawals.spec.ts    # 2 tests
│   │   └── smoke.spec.ts          # 3 tests
│   ├── utilities/                  # 4 Utility Classes
│   │   ├── CommonUtils.ts
│   │   ├── Logger.ts
│   │   ├── TestDataFactory.ts
│   │   ├── TestRailClient.ts
│   │   └── testrail-mapping.json
│   ├── database/                   # Database Layer
│   │   ├── DatabaseClient.ts
│   │   ├── DatabaseHelper.ts
│   │   └── schema/
│   │       ├── banking-schema.sql  # 8 tables
│   │       └── test-data.sql
│   ├── scripts/                    # Automation Scripts
│   │   ├── validate-env.js
│   │   ├── database/
│   │   │   ├── db-setup.js
│   │   │   ├── db-cleanup.js
│   │   │   └── db-validator.js
│   │   └── testrail/
│   │       └── testrail-uploader.js
│   └── types/
│       └── globals.d.ts
├── test-data/
│   └── testData.json
├── docs/
│   ├── JENKINS_INTEGRATION.md
│   ├── DATABASE_INTEGRATION.md
│   └── TESTRAIL_INTEGRATION.md
├── wdio.conf.ts                   # Main configuration
├── wdio-smoke.conf.ts             # Smoke test config
├── tsconfig.json                  # TypeScript config
├── package.json                   # Dependencies
├── Jenkinsfile                    # CI/CD pipeline
├── .env.example                   # Environment template
└── [documentation files]
```

---

## 🔧 npm Scripts

### Testing
```powershell
npm test                     # Run all tests
npm run test:smoke          # Quick validation
npm run test:chrome         # Chrome browser
npm run test:firefox        # Firefox browser
npm run test:headless       # Headless mode
npm run test:debug          # Debug mode
npm run test:parallel       # 4 parallel tests
npm run test:login          # Login tests only
npm run test:dashboard      # Dashboard tests only
npm run test:accounts       # Accounts tests only
npm run test:transactions   # Transactions tests only
npm run test:deposits       # Deposits tests only
npm run test:withdrawals    # Withdrawals tests only
```

### Configuration
```powershell
npm run validate:env        # Validate environment setup
```

### Database
```powershell
npm run db:validator        # Check MySQL connection
npm run db:setup           # Initialize database
npm run db:cleanup         # Clean test data
npm run db:validate-schema # Validate schema
```

### Reporting
```powershell
npm run report             # Generate Allure report
npm run testrail:upload    # Upload results to TestRail
```

---

## 🏗️ Architecture

### Page Object Model (POM)
All UI interactions are encapsulated in page objects:

```typescript
// Example: Login test using POM
describe('Login Tests', () => {
  it('should login with valid credentials', async () => {
    await loginPage.open();
    await loginPage.login('testuser1', 'test@123');
    await expect(dashboardPage.getTitle()).toContain('Customers');
  });
});
```

### Database Integration
Automatic test data setup/cleanup:

```typescript
// Setup test data before tests
beforeAll(async () => {
  await databaseHelper.setupTestData();
});

// Cleanup after tests
afterAll(async () => {
  await databaseHelper.cleanupTestData();
});
```

### Jenkins CI/CD Pipeline
Automated testing workflow:

```groovy
Pipeline Stages:
1. Checkout    → Clone repository
2. Validate DB → Check MySQL connection
3. Setup DB    → Initialize test database
4. Run Tests   → Execute WebdriverIO tests
5. Upload      → Send results to TestRail
6. Cleanup     → Remove test data
```

---

## 📊 Test Coverage

| Test Suite | Tests | Coverage |
|------------|-------|----------|
| Login | 4 | Authentication scenarios |
| Dashboard | 3 | Customer portal functionality |
| Accounts | 2 | Account listing & selection |
| Transactions | 2 | Transaction history & reset |
| Deposits | 2 | Deposit operations |
| Withdrawals | 2 | Withdrawal operations |
| Smoke | 3 | Framework validation |
| **Total** | **18** | **Core workflows** |

---

## 🗄️ Database Schema

**8 Tables**: Users, Accounts, Transactions, Transfers, Deposits, Withdrawals, TestResults, AuditLogs

**Automatic Setup**: SQL schema files are executed by `db-setup.js`

**Test Data**: Sample customers, accounts, and transactions pre-populated

---

## 🚀 Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | WebdriverIO | 8.27.0 |
| Language | TypeScript | 5.3.0 |
| Test Framework | Mocha | BDD |
| Assertions | Chai | 6.2.1 |
| Browser Driver | ChromeDriver | 129.0.0 |
| Database | MySQL | 5.7+ / 8.0+ |
| DB Client | mysql2/promise | 3.6.5 |
| HTTP Client | Axios | 1.6.0 |
| Environment | Dotenv | 16.3.0 |
| Reporting | Allure | Latest |
| CI/CD | Jenkins | 2.x+ |
| Runtime | Node.js | 18.0+ |

---

## 🔐 Security

✅ Environment-based credentials (no hardcoded values)
✅ Jenkins credential store integration
✅ Database connection pooling
✅ Input validation in all scripts
✅ Error handling with secure logging
✅ API token support for TestRail

---

## 📖 Example: Running Your First Test

### 1. Setup Environment
```powershell
npm run validate:env
```

### 2. Initialize Database (Optional)
```powershell
npm run db:setup
```

### 3. Run Smoke Tests
```powershell
npm run test:smoke
```

### 4. Run Specific Test Suite
```powershell
npm run test:login
```

### 5. View Results
```powershell
npm run report
```

---

## 🆘 Troubleshooting

### Database Connection Error
```
❌ "ECONNREFUSED 127.0.0.1:3306"
✅ Verify MySQL is running and credentials in .env are correct
```

### Chrome Driver Error
```
❌ "Chrome driver not found"
✅ Install Chrome browser or run: npm install chromedriver@latest
```

### Environment Setup Error
```
❌ "Missing environment variables"
✅ Run: npm run validate:env and update .env accordingly
```

### TypeScript Errors
```
❌ "Cannot find module '@wdio/globals'"
✅ Run: npm install --legacy-peer-deps
```

📖 **See [COMPLETE_SETUP_GUIDE.md](./COMPLETE_SETUP_GUIDE.md) for detailed troubleshooting**

---

## 🎓 Application Under Test

- **URL**: https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
- **Type**: Angular-based Banking Application
- **Features**: 
  - Customer & Manager authentication
  - Account management
  - Deposits & Withdrawals
  - Transaction history
  - Account transfers

### Test Credentials
- Username: `testuser1`
- Password: `test@123`
- (Or use any customer from dropdown)

---

## 📝 Next Steps

1. **Quick Start**: Follow [QUICKSTART_SETUP.md](./QUICKSTART_SETUP.md)
2. **Full Setup**: Follow [COMPLETE_SETUP_GUIDE.md](./COMPLETE_SETUP_GUIDE.md)
3. **Jenkins**: Follow [docs/JENKINS_INTEGRATION.md](./docs/JENKINS_INTEGRATION.md)
4. **Database**: Follow [docs/DATABASE_INTEGRATION.md](./docs/DATABASE_INTEGRATION.md)
5. **TestRail**: Follow [docs/TESTRAIL_INTEGRATION.md](./docs/TESTRAIL_INTEGRATION.md)

---

## 📞 Support

| Issue | Resource |
|-------|----------|
| Setup Questions | See [COMPLETE_SETUP_GUIDE.md](./COMPLETE_SETUP_GUIDE.md) |
| Database Issues | See [docs/DATABASE_INTEGRATION.md](./docs/DATABASE_INTEGRATION.md) |
| Jenkins Issues | See [docs/JENKINS_INTEGRATION.md](./docs/JENKINS_INTEGRATION.md) |
| Test Failures | Check logs in console or reports directory |
| Configuration | Run `npm run validate:env` |

---

## 📄 License

ISC License - See LICENSE file

---

## ✨ What's Included

✅ Production-Ready Framework
✅ 18 Automated Test Cases
✅ 7 Page Objects with 25+ Methods
✅ MySQL Database Integration
✅ Jenkins CI/CD Pipeline
✅ TestRail Integration
✅ Allure Reporting
✅ Comprehensive Documentation
✅ Environment Configuration
✅ Error Handling & Logging

---

## 🎉 Get Started Now!

```powershell
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Configure environment
Copy-Item .env.example .env

# 3. Run smoke tests
npm run test:smoke

# 4. View results
npm run report
```

**Happy Testing! 🚀**

---

**Version**: 1.0.0  
**Status**: Production Ready ✅  
**Last Updated**: December 2024  
**Framework**: WebdriverIO 8.27.0 with TypeScript  
**Maintainer**: QA Automation Team
