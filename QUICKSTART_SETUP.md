# Quick Start Guide - WebdriverIO Banking Framework

## 🚀 Get Running in 5 Minutes

### Prerequisites Check
```powershell
# Verify Node.js is installed
node --version  # Should be v18+
npm --version   # Should be v9+

# Verify Git is installed
git --version   # Should be v2+
```

---

## 1. Clone & Install

```powershell
# Navigate to project directory
cd "d:\WebdriverIO framework"

# Install dependencies
npm install --legacy-peer-deps
```

---

## 2. Configure Environment

```powershell
# Create .env file from template
Copy-Item .env.example .env

# Edit .env with your values
# Use Notepad or your favorite editor
notepad .env
```

### Minimum Required Configuration
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password

# Application
APP_URL=https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login
```

### Validate Configuration
```powershell
npm run validate:env
```

---

## 3. Setup Database (Optional but Recommended)

```powershell
# Check MySQL connection
npm run db:validator

# Create database and tables
npm run db:setup

# Verify setup
npm run db:validate-schema
```

---

## 4. Run Tests

### Run All Tests
```powershell
npm test
```

### Run Specific Test Suite
```powershell
npm run test:smoke          # Framework validation
npm run test:login          # Login tests only
npm run test:dashboard      # Dashboard tests
npm run test:accounts       # Accounts tests
npm run test:transactions   # Transactions tests
npm run test:deposits       # Deposits tests
npm run test:withdrawals    # Withdrawals tests
```

### Run with Different Browsers
```powershell
npm run test:chrome         # Chrome browser
npm run test:firefox        # Firefox browser
npm run test:headless       # Headless mode
npm run test:debug          # Debug mode
```

### Run in Parallel
```powershell
npm run test:parallel       # Run 4 tests concurrently
```

---

## 5. View Results

### Local Report
```powershell
npm run report

# Opens Allure HTML report automatically
# Also available at: allure-results/index.html
```

---

## Common Commands Reference

```powershell
# Testing
npm test                    # Run all tests
npm run test:smoke         # Run smoke tests (quick validation)
npm run test:headless      # Run in headless mode
npm run test:debug         # Run with debug output

# Environment
npm run validate:env       # Check configuration
npm run setup              # Full setup (if script exists)

# Database
npm run db:validator       # Check database connection
npm run db:setup          # Initialize database
npm run db:cleanup        # Clean test data

# Reporting
npm run report            # Generate and open Allure report
npm run testrail:upload   # Upload results to TestRail (Jenkins)

# TypeScript
npx tsc --noEmit -p tsconfig.json  # Check for TypeScript errors
```

---

## 🐛 Troubleshooting

### Database Connection Error
```
❌ "ECONNREFUSED 127.0.0.1:3306"

✅ Solution:
1. Verify MySQL is running
   - Windows: Services → MySQL
   - Mac: brew services list
2. Check DB_HOST and DB_PORT in .env
3. Verify DB_USER and DB_PASSWORD
```

### Cannot Find Chrome Driver
```
❌ "Chrome driver not found"

✅ Solution:
1. Install Google Chrome browser
2. Run: npm install chromedriver@latest
3. Verify Chrome version: chrome://version/
```

### Tests Timeout
```
❌ "Timeout after 60000ms"

✅ Solution:
1. Check APP_URL is correct in .env
2. Verify application is accessible
3. Increase timeout in wdio.conf.ts
4. Check internet connection
```

### TypeScript Errors
```
❌ "Cannot find module '@wdio/globals'"

✅ Solution:
1. Verify all dependencies installed: npm install --legacy-peer-deps
2. Check tsconfig.json includes @wdio/globals
3. Compile check: npx tsc --noEmit -p tsconfig.json
```

---

## 📂 Project Structure

```
d:\WebdriverIO framework\
├── src/
│   ├── pages/              # Page Objects
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   └── ...
│   ├── tests/specs/        # Test Cases
│   │   ├── login.spec.ts
│   │   ├── dashboard.spec.ts
│   │   └── ...
│   ├── utilities/          # Helper Classes
│   │   ├── CommonUtils.ts
│   │   ├── Logger.ts
│   │   └── TestDataFactory.ts
│   ├── database/           # Database Layer
│   │   ├── DatabaseClient.ts
│   │   ├── DatabaseHelper.ts
│   │   └── schema/
│   │       ├── banking-schema.sql
│   │       └── test-data.sql
│   ├── scripts/            # Automation Scripts
│   │   ├── database/
│   │   │   ├── db-setup.js
│   │   │   ├── db-cleanup.js
│   │   │   └── db-validator.js
│   │   ├── testrail/
│   │   │   └── testrail-uploader.js
│   │   └── validate-env.js
│   └── types/
│       └── globals.d.ts    # TypeScript Declarations
├── test-data/
│   └── testData.json       # Test Data
├── wdio.conf.ts            # WebdriverIO Config
├── wdio-smoke.conf.ts      # Smoke Test Config
├── tsconfig.json           # TypeScript Config
├── package.json            # Dependencies
├── Jenkinsfile             # CI/CD Pipeline
├── .env.example            # Environment Template
└── docs/                   # Documentation
```

---

## 📖 Next Steps

1. **Read Full Setup Guide**: `COMPLETE_SETUP_GUIDE.md`
2. **Jenkins Integration**: `docs/JENKINS_INTEGRATION.md`
3. **Database Integration**: `docs/DATABASE_INTEGRATION.md`
4. **TestRail Integration**: `docs/TESTRAIL_INTEGRATION.md`
5. **Test Banking App**: https://www.globalsqa.com/angularJs-protractor/BankingProject/

---

## 💡 Tips

- **First Run**: Start with `npm run test:smoke` to verify framework is working
- **Debug Mode**: Use `npm run test:debug` to see detailed output
- **Headless**: Use `npm run test:headless` for CI/CD environments
- **Parallel**: Use `npm run test:parallel` to speed up test execution
- **Reporting**: Always generate reports with `npm run report`

---

## 🆘 Need Help?

1. Check troubleshooting section above
2. Review error logs in console output
3. Check `.env` configuration
4. Verify all dependencies are installed
5. Review `COMPLETE_SETUP_GUIDE.md`
6. Check individual integration guides in `docs/`

---

**Happy Testing! 🎉**
