# WebdriverIO Framework - Complete Setup Guide

## Overview
This guide provides comprehensive instructions for setting up and configuring the WebdriverIO POM framework with Jenkins CI/CD, MySQL database integration, and TestRail test management system.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Configuration](#database-configuration)
4. [Jenkins Configuration](#jenkins-configuration)
5. [TestRail Configuration](#testrail-configuration)
6. [Running Tests](#running-tests)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Java**: v8 or higher (for Jenkins)
- **MySQL**: v5.7 or v8.0
- **Git**: v2.0 or higher

### Tools Installation

#### Windows
```powershell
# Install Node.js from https://nodejs.org/
# Install Git from https://git-scm.com/download/win
# Install MySQL from https://dev.mysql.com/downloads/mysql/

# Verify installations
node --version
npm --version
git --version
```

#### macOS
```bash
# Using Homebrew
brew install node
brew install git
brew install mysql

# Verify installations
node --version
npm --version
git --version
```

---

## Environment Setup

### 1. Clone Repository
```powershell
git clone <repository-url>
cd "d:\WebdriverIO framework"
```

### 2. Install Dependencies
```powershell
npm install --legacy-peer-deps
```

### 3. Environment Variables Configuration

#### Step 1: Create .env file
```powershell
Copy-Item .env.example .env
```

#### Step 2: Edit .env file
Open `.env` in your editor and update with your actual values:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=banking_app_test

# TestRail Configuration
TESTRAIL_URL=https://your-instance.testrail.com
TESTRAIL_USER=your_email@example.com
TESTRAIL_PASSWORD=your_api_token
TESTRAIL_PROJECT_ID=1
TESTRAIL_SUITE_ID=1

# Test Environment
TEST_ENV=dev
NODE_ENV=development
APP_URL=https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login

# Browser Configuration
BROWSER_NAME=chrome
HEADLESS=false

# Logging
LOG_LEVEL=info
```

### 4. Verify Environment
```powershell
npm run validate:env
```

---

## Database Configuration

### 1. MySQL Setup

#### Windows - Create MySQL User
```sql
-- Login to MySQL
mysql -u root -p

-- Create test database
CREATE DATABASE banking_app_test;

-- Create dedicated user (optional but recommended)
CREATE USER 'test_user'@'localhost' IDENTIFIED BY 'test_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON banking_app_test.* TO 'test_user'@'localhost';
FLUSH PRIVILEGES;

-- Verify
SHOW GRANTS FOR 'test_user'@'localhost';
```

### 2. Initialize Database Schema
```powershell
# Run database validator (checks MySQL connection)
npm run db:validator

# Setup database schema and tables
npm run db:setup

# Verify schema was created
npm run db:validate-schema
```

### 3. Verify Database Connection
```powershell
# Test database connection
npm run db:test-connection

# This will output connection status and database info
```

### 4. Load Test Data
```powershell
# The test data is automatically loaded by db:setup script
# If you need to reload test data:
npm run db:cleanup
npm run db:setup
```

---

## Jenkins Configuration

### 1. Jenkins Installation & Setup

#### Windows
```powershell
# Download Jenkins WAR from https://www.jenkins.io/download/
# Run Jenkins
java -jar jenkins.war

# Jenkins starts at http://localhost:8080
```

#### Docker Alternative
```powershell
# Pull Jenkins image
docker pull jenkins/jenkins:latest

# Run Jenkins
docker run -d -p 8080:8080 -p 50000:50000 ^
  -v jenkins_home:/var/jenkins_home ^
  --name jenkins jenkins/jenkins:latest

# Get initial password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

### 2. Initial Jenkins Configuration
1. Navigate to `http://localhost:8080`
2. Enter the initial admin password from console
3. Click "Install suggested plugins"
4. Create first admin user
5. Configure Jenkins URL (leave as default or set to your domain)

### 3. Install Required Plugins
1. Go to **Manage Jenkins** → **Manage Plugins**
2. Install these plugins:
   - Git
   - Pipeline
   - Blue Ocean
   - Allure
   - NodeJS
   - Email Extension
   - Log Parser

### 4. Configure Credentials

#### Add MySQL Credentials
1. Go to **Manage Jenkins** → **Manage Credentials**
2. Click **System** → **Global credentials**
3. Click **Add Credentials**
   - Kind: Username with password
   - Scope: Global
   - Username: `test_user`
   - Password: (your MySQL password)
   - ID: `mysql-credentials`
   - Description: "MySQL Test Database"

#### Add TestRail Credentials
1. Repeat steps 1-3 above
   - Kind: Username with password
   - Scope: Global
   - Username: (your TestRail email)
   - Password: (your TestRail API token)
   - ID: `testrail-credentials`
   - Description: "TestRail API Credentials"

### 5. Configure System Settings

#### Add NodeJS
1. Go to **Manage Jenkins** → **Global Tool Configuration**
2. Scroll to **NodeJS**
3. Click **Add NodeJS**
   - Name: `NodeJS 18`
   - Version: `18.x (latest)`
   - Save

#### Add Git
1. Scroll to **Git**
2. Set Git executable path (usually auto-detected)
3. Save

### 6. Create Jenkins Pipeline Job

#### Method 1: Via Jenkins UI
1. Click **New Item**
2. Enter job name: `WebdriverIO-Tests`
3. Select **Pipeline**
4. Click **OK**

#### Pipeline Configuration
1. Under **Pipeline** section
2. Select **Pipeline script from SCM**
3. Set **SCM** to **Git**
4. Enter **Repository URL**: `<your-git-repo-url>`
5. Set **Branch**: `*/main`
6. Set **Script Path**: `Jenkinsfile`
7. Save

#### Method 2: Via Jenkinsfile
The `Jenkinsfile` in the repository root contains all pipeline configuration. Jenkins will automatically use this when configured as above.

### 7. Jenkins Pipeline Stages

The pipeline executes these stages:

1. **Checkout**: Clone git repository
2. **Validate DB**: Check MySQL connection
3. **Setup DB**: Initialize test database
4. **Run Tests**: Execute WebdriverIO tests
5. **Upload Results**: Send results to TestRail
6. **Cleanup**: Remove test data

### 8. Run Pipeline
1. Click **Build Now** on the pipeline job
2. Monitor progress in **Build History**
3. Click on build number to see detailed logs
4. Results appear in **Test Results** tab

### 9. Configure Email Notifications (Optional)
1. Go to **Manage Jenkins** → **Configure System**
2. Scroll to **Email Notification**
3. Set **SMTP server**: `smtp.gmail.com`
4. Enable **Use SMTP Authentication**
5. Set **Default Subject Prefix**: `[Jenkins] WebdriverIO Tests`
6. Save

---

## TestRail Configuration

### 1. TestRail Account Setup

If you don't have a TestRail account:
1. Visit https://testrail.com/
2. Sign up for a free trial
3. Create a project: "Banking Application Tests"
4. Create a test suite: "WebdriverIO Tests"

### 2. Generate API Token
1. Log in to TestRail
2. Click your user icon (top right) → **My Settings**
3. Click **API Tokens** tab
4. Click **Generate new token**
5. Copy the token
6. Update `TESTRAIL_PASSWORD` in `.env` with this token

### 3. Configure Test Case Mapping

The test case mapping is defined in `src/utilities/testrail-mapping.json`:

```json
{
  "projectId": 1,
  "suiteId": 1,
  "testCases": {
    "login": {
      "cases": {
        "should login with valid credentials": "C1",
        "should display error message for invalid username": "C2"
      }
    }
  }
}
```

**How to map test cases:**
1. In TestRail, create test cases matching your test names
2. Note each test case ID (displayed as C1, C2, etc.)
3. Update `testrail-mapping.json` with these IDs
4. The test runner will use these IDs when uploading results

### 4. Upload Test Results
```powershell
# Automatically happens in Jenkins pipeline
# Or manually run:
npm run testrail:upload

# Results appear in TestRail as a test run with all results
```

### 5. View Results in TestRail
1. Log in to TestRail
2. Go to **Test Runs & Results**
3. Find the latest test run named with Jenkins build number
4. Review passed/failed tests with error details

---

## Running Tests

### Local Test Execution

#### Run All Tests
```powershell
npm test
```

#### Run Specific Test Suite
```powershell
# Login tests only
npm run test:login

# Dashboard tests only
npm run test:dashboard

# All tests available:
npm run test:login
npm run test:dashboard
npm run test:accounts
npm run test:transactions
npm run test:deposits
npm run test:withdrawals
npm run test:smoke
```

#### Run Headless Mode
```powershell
npm run test:headless
```

#### Run in Parallel (if configured)
```powershell
npm run test:parallel
```

#### Run Smoke Tests
```powershell
npm run test:smoke
```

### View Test Reports

#### Local Reports
```powershell
# Generate and open Allure report
npm run report

# Or manually open from allure-results folder
```

#### Jenkins Reports
1. Go to Jenkins pipeline job
2. Click latest build
3. Scroll to **Test Results**
4. View consolidated test report

### Test Report Locations
- **Allure HTML**: `allure-results/` → `index.html`
- **Spec Reporter**: Console output
- **TestRail**: https://your-instance.testrail.com/

---

## Troubleshooting

### Database Connection Issues

#### Problem: "ECONNREFUSED 127.0.0.1:3306"
```
Solution:
1. Verify MySQL is running: services.msc (Windows) or brew services list (Mac)
2. Check credentials in .env file
3. Verify database exists: mysql -u root -p -e "SHOW DATABASES;"
4. Check MySQL user has correct permissions
```

#### Problem: "Access denied for user"
```
Solution:
1. Verify DB_USER and DB_PASSWORD in .env
2. Test connection manually: mysql -u test_user -p -h localhost banking_app_test
3. Reset MySQL password if forgotten
```

#### Problem: "Database 'banking_app_test' doesn't exist"
```
Solution:
Run npm run db:setup to create database and tables
```

### Test Execution Issues

#### Problem: "Cannot find Chrome driver"
```
Solution:
1. Install Chrome browser
2. Update ChromeDriver: npm install chromedriver@latest
3. Verify Chrome version matches ChromeDriver version
```

#### Problem: "Timeout waiting for element"
```
Solution:
1. Increase waitForTimeout in wdio.conf.ts
2. Verify application URL is correct in .env
3. Check element selectors in page objects
```

#### Problem: "TypeScript compilation errors"
```
Solution:
1. Verify tsconfig.json is correct
2. Run: npx tsc --noEmit -p tsconfig.json
3. Check all imports have corresponding type definitions
```

### Jenkins Issues

#### Problem: "Pipeline job fails immediately"
```
Solution:
1. Check Jenkins logs: /var/lib/jenkins/logs/
2. Verify Node.js is installed on Jenkins agent
3. Check Git repository URL is correct
4. Verify Jenkins has read access to repository
```

#### Problem: "Credentials not accessible in pipeline"
```
Solution:
1. Verify credentials are created in Jenkins (Manage Credentials)
2. Check credential IDs match pipeline references
3. Verify Jenkins user has permission to use credentials
```

#### Problem: "TestRail upload fails"
```
Solution:
1. Verify TESTRAIL_URL, TESTRAIL_USER, TESTRAIL_PASSWORD in .env
2. Test TestRail API token: curl -u user:token https://your-instance.testrail.com/api/v2/projects
3. Verify test case IDs in testrail-mapping.json exist in TestRail
4. Check JSON format in testrail-mapping.json
```

### General Troubleshooting Steps

1. **Enable Debug Logging**
   ```powershell
   LOG_LEVEL=debug npm test
   ```

2. **Check Log Files**
   ```powershell
   # Check WebdriverIO logs
   Get-Content logs/wdio.log -Tail 50

   # Check database script logs
   Get-Content logs/database.log -Tail 50
   ```

3. **Validate Configuration**
   ```powershell
   # Validate environment setup
   npm run validate:env

   # Compile TypeScript
   npx tsc --noEmit -p tsconfig.json
   ```

4. **Run Smoke Tests**
   ```powershell
   # Quick framework validation
   npm run test:smoke
   ```

5. **Check Dependencies**
   ```powershell
   # Verify all packages installed
   npm list
   
   # Update packages if needed
   npm update
   ```

---

## Additional Resources

- [WebdriverIO Documentation](https://webdriver.io/)
- [TestRail API Documentation](https://docs.testrail.com/display/api)
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [GlobalQA Banking Project](https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login)

---

## Support & Contributions

For issues, questions, or contributions:
1. Check existing documentation
2. Review troubleshooting section above
3. Check Jenkins logs and test execution logs
4. Verify environment configuration
5. Create detailed bug reports with logs

---

**Last Updated**: January 2024
**Framework Version**: 1.0.0
**Maintainer**: QA Automation Team
