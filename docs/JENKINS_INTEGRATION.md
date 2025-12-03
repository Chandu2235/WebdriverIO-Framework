# Jenkins Integration Guide

## Overview
This guide covers setting up WebdriverIO automation tests with Jenkins CI/CD pipeline, including database integration and TestRail reporting.

## Prerequisites

- Jenkins 2.387+ 
- Node.js 16+
- npm 8+
- MySQL 8.0+ (for database integration)
- TestRail account (for test reporting)
- Git integration with Jenkins

## Setup Steps

### 1. Jenkins Configuration

#### Install Required Plugins
Navigate to **Manage Jenkins → Plugin Manager** and install:
- Blue Ocean
- NodeJS Plugin
- Timestamper
- AnsiColor
- HTML Publisher
- JUnit Plugin

#### Configure Node.js
1. Go to **Manage Jenkins → Global Tool Configuration**
2. Add Node.js installation (name it `node16` or similar)
3. Select the version and save

### 2. Create Jenkins Job

#### Option A: Create Pipeline Job

1. Click **New Item**
2. Enter job name (e.g., `banking-app-automation`)
3. Select **Pipeline**
4. In **Pipeline** section, select:
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `<your-git-repo>`
   - Branch: `*/main`
5. Script Path: `Jenkinsfile` (at repository root)
6. Save and run

#### Option B: Manual Setup

Create a Declarative Pipeline with the provided `Jenkinsfile`.

### 3. Jenkins Credentials Setup

Create Jenkins credentials for sensitive data:

```bash
# Navigate to Credentials → System → Global credentials (unrestricted)
```

Add the following credentials:

| Credential ID | Type | Value |
|---|---|---|
| `db-host` | Secret text | MySQL host (e.g., localhost) |
| `db-user` | Secret text | MySQL username |
| `db-password` | Secret password | MySQL password |
| `db-name` | Secret text | Database name |
| `testrail-url` | Secret text | TestRail URL |
| `testrail-user` | Secret text | TestRail email/username |
| `testrail-password` | Secret password | TestRail password |
| `testrail-project-id` | Secret text | TestRail project ID |
| `testrail-suite-id` | Secret text | TestRail suite ID |

### 4. Jenkinsfile Parameters

The pipeline accepts these parameters:

```groovy
parameters {
    choice(name: 'TEST_ENV', choices: ['dev', 'staging', 'prod'])
    choice(name: 'BROWSER', choices: ['chrome', 'firefox', 'headless'])
    booleanParam(name: 'RUN_PARALLEL', defaultValue: true)
    booleanParam(name: 'UPDATE_TESTRAIL', defaultValue: true)
    booleanParam(name: 'VALIDATE_DB', defaultValue: true)
}
```

When running a build, you can specify these parameters.

## Pipeline Stages

### 1. Checkout
Clones the repository

### 2. Setup Environment
Verifies Node.js and npm versions

### 3. Install Dependencies
Runs `npm install --legacy-peer-deps`

### 4. Database Validation
Validates database connectivity (if enabled)

```bash
npm run db:validate
```

### 5. Database Setup/Reset
Initializes test database (for dev/staging)

```bash
npm run db:setup
```

### 6. Compile TypeScript
Compiles TypeScript files

```bash
npx tsc --noEmit -p tsconfig.json
```

### 7. Run Tests
Executes automated tests based on parameters

```bash
npm test -- --maxInstances=${PARALLEL_INSTANCES}
```

### 8. Database Cleanup
Clears test data after execution

```bash
npm run db:cleanup
```

### 9. TestRail Integration
Uploads test results to TestRail (if enabled)

```bash
npm run testrail:upload
```

### 10. Generate Reports
Creates Allure HTML report

```bash
npm run report
```

## Post-Build Actions

- Publishes JUnit test results
- Archives test reports
- Publishes HTML report (Allure)
- Performs workspace cleanup

## Running Tests from Jenkins

### Via Web UI
1. Go to your Jenkins job
2. Click **Build with Parameters**
3. Select desired options
4. Click **Build**

### Via CLI (using Jenkins CLI)
```bash
java -jar jenkins-cli.jar -s http://jenkins:8080/ \
  build banking-app-automation \
  -p TEST_ENV=staging \
  -p BROWSER=headless \
  -p RUN_PARALLEL=true
```

### Via Webhook (Auto-trigger)
Set up webhook in GitHub/GitLab to trigger builds on commits:
1. Go to job configuration
2. Enable **GitHub hook trigger for GITScm polling**
3. Set up webhook in your Git provider pointing to: `http://jenkins:8080/github-webhook/`

## Viewing Results

### Allure Report
- Located at: `http://jenkins:8080/job/banking-app-automation/allure/`
- Shows detailed test execution metrics

### JUnit Results
- Displayed in Jenkins UI under **Test Result**
- Shows passed/failed/skipped counts

### TestRail Results
- Automatically uploaded after test run
- View in your TestRail project dashboard

## Troubleshooting

### Issue: Database Connection Failed

**Solution:**
1. Verify credentials in Jenkins
2. Check database is running: `mysql -h localhost -u user -p`
3. Check firewall rules
4. Verify `DB_HOST` is reachable from Jenkins node

### Issue: TestRail Upload Fails

**Solution:**
1. Verify TestRail credentials are correct
2. Check TestRail API is accessible
3. Verify project and suite IDs are correct
4. Check report files exist in `reports/` directory

### Issue: Tests Timeout

**Solution:**
1. Increase timeout in `wdio.conf.ts`:
   ```typescript
   timeout: 120000  // 2 minutes
   ```
2. Reduce parallel instances
3. Check if application is responding

### Issue: Out of Memory

**Solution:**
1. Reduce parallel instances: `--maxInstances=2`
2. Increase Node.js memory: `NODE_OPTIONS=--max-old-space-size=4096`

## CI/CD Best Practices

1. **Use Environments**: Run different test suites per environment
2. **Parallel Execution**: Use `RUN_PARALLEL=true` for faster execution
3. **Database Isolation**: Always reset database between runs
4. **Report Archival**: Keep historical reports for trend analysis
5. **Notifications**: Set up email/Slack alerts for failures

## Advanced Configuration

### Scheduled Builds
1. Go to job configuration
2. Under **Build Triggers**, enable **Build periodically**
3. Set cron schedule (e.g., `0 2 * * *` for 2 AM daily)

### Pipeline as Code
Keep `Jenkinsfile` in version control and version it along with your tests.

### Email Notifications
Add to `Jenkinsfile`:
```groovy
post {
    failure {
        emailext(
            subject: 'Test Execution Failed',
            body: 'Check Jenkins for details',
            to: '${DEFAULT_RECIPIENTS}'
        )
    }
}
```

### Slack Notifications
```groovy
post {
    always {
        slackSend(
            color: currentBuild.result == 'SUCCESS' ? 'good' : 'danger',
            message: "Build: ${env.BUILD_NUMBER} - ${currentBuild.result}"
        )
    }
}
```

## Additional Resources

- [Jenkinsfile Documentation](https://jenkins.io/doc/book/pipeline/jenkinsfile/)
- [WebdriverIO Documentation](https://webdriver.io/)
- [TestRail API Documentation](https://www.guidepoint.com/docs/testrail-api/)
- [MySQL Driver Documentation](https://github.com/mysqljs/mysql2)

---

**For questions or issues, refer to the main README.md or framework documentation.**
