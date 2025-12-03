# TestRail Integration Guide

## Overview
This guide explains how to integrate your WebdriverIO tests with TestRail for centralized test case management and result reporting.

## Prerequisites

- TestRail account and instance
- TestRail API access enabled
- Project and Suite IDs from TestRail
- TestRail credentials (email and API token)

## Setup

### 1. TestRail Configuration

#### Get TestRail Credentials
1. Log into your TestRail instance
2. Go to **Administration** → **Users & Roles**
3. Click on your user profile
4. Generate an API token (if not already generated)
5. Copy the token for use in configuration

#### Get Project and Suite IDs
1. Navigate to your project in TestRail
2. In URL, note the project ID: `https://testrail.com/index.php?/projects/{PROJECT_ID}`
3. Navigate to your test suite
4. In URL, note the suite ID: `https://testrail.com/index.php?/suites/{SUITE_ID}`

### 2. Environment Configuration

Set environment variables:

```bash
# Windows (PowerShell)
$env:TESTRAIL_URL = "https://your-instance.testrail.com"
$env:TESTRAIL_USER = "your_email@example.com"
$env:TESTRAIL_PASSWORD = "your_api_token"
$env:TESTRAIL_PROJECT_ID = "1"
$env:TESTRAIL_SUITE_ID = "1"

# Linux/Mac
export TESTRAIL_URL="https://your-instance.testrail.com"
export TESTRAIL_USER="your_email@example.com"
export TESTRAIL_PASSWORD="your_api_token"
export TESTRAIL_PROJECT_ID="1"
export TESTRAIL_SUITE_ID="1"
```

Or create a `.env` file:
```env
TESTRAIL_URL=https://your-instance.testrail.com
TESTRAIL_USER=your_email@example.com
TESTRAIL_PASSWORD=your_api_token
TESTRAIL_PROJECT_ID=1
TESTRAIL_SUITE_ID=1
```

### 3. Install Dependencies

```bash
npm install axios
```

## TestRail API Client

### Import TestRailClient
```typescript
import TestRailClient from '../utilities/TestRailClient';

const config = {
  url: process.env.TESTRAIL_URL,
  username: process.env.TESTRAIL_USER,
  password: process.env.TESTRAIL_PASSWORD,
  projectId: parseInt(process.env.TESTRAIL_PROJECT_ID),
  suiteId: parseInt(process.env.TESTRAIL_SUITE_ID),
};

const testrail = new TestRailClient(config);
```

## Usage in Tests

### Verify TestRail Connection
```typescript
const isConnected = await testrail.verifyConnection();
if (!isConnected) {
  Logger.error('TestRail connection failed');
}
```

### Get Test Cases
```typescript
const testCases = await testrail.getTestCases();
console.log(`Found ${testCases.length} test cases`);

// Map test names to case IDs
const testCaseMap = {};
testCases.forEach(tc => {
  testCaseMap[tc.title] = tc.id;
});
```

### Add Single Test Result
```typescript
const result = {
  testCaseId: 123,
  status: 'passed',
  comment: 'Test passed successfully',
  executionTime: 5000,
};

await testrail.addResult(result);
```

### Create Test Run
```typescript
const runId = await testrail.createRun(
  'Automated Test Run - Banking App',
  'Run created by CI/CD pipeline'
);
console.log(`Created test run: ${runId}`);
```

### Add Multiple Results to Run
```typescript
const results = [
  {
    testCaseId: 1,
    status: 'passed',
    comment: 'Test 1 passed',
    executionTime: 3000,
  },
  {
    testCaseId: 2,
    status: 'failed',
    comment: 'Test 2 failed',
    executionTime: 2000,
    errorMessage: 'Expected value to be true',
  },
];

await testrail.addResults(runId, results);
```

### Close Test Run
```typescript
await testrail.closeRun(runId);
console.log('Test run closed');
```

## Test Result Status Mapping

| Status | ID | Meaning |
|--------|----|-|
| Passed | 1 | Test passed |
| Blocked | 3 | Test blocked |
| Failed | 5 | Test failed |
| Skipped | 6 | Test skipped |

## Integration Example

### Complete Test with TestRail Reporting
```typescript
import { expect } from 'chai';
import TestRailClient from '../../utilities/TestRailClient';
import { Logger } from '../../utilities/Logger';

describe('Banking Tests with TestRail Integration', () => {
  let testrail: TestRailClient;
  let runId: number;
  const testCaseMap = {
    'Login': 1,
    'Deposit': 2,
    'Withdrawal': 3,
  };

  before(async () => {
    // Initialize TestRail
    testrail = new TestRailClient({
      url: process.env.TESTRAIL_URL,
      username: process.env.TESTRAIL_USER,
      password: process.env.TESTRAIL_PASSWORD,
      projectId: 1,
      suiteId: 1,
    });

    // Create test run
    runId = await testrail.createRun(
      `Banking Tests - ${new Date().toISOString()}`
    );
  });

  after(async () => {
    if (runId) {
      await testrail.closeRun(runId);
    }
  });

  it('TC001 - Should login successfully', async () => {
    const startTime = Date.now();
    try {
      // Your test code here
      const loginPage = new LoginPage();
      await loginPage.login('user', 'password');
      
      const duration = Date.now() - startTime;
      
      // Report to TestRail
      await testrail.addResults(runId, [{
        testCaseId: testCaseMap['Login'],
        status: 'passed',
        comment: 'Login successful',
        executionTime: duration,
      }]);
    } catch (error) {
      const duration = Date.now() - startTime;
      await testrail.addResults(runId, [{
        testCaseId: testCaseMap['Login'],
        status: 'failed',
        comment: error.message,
        executionTime: duration,
        errorMessage: error.stack,
      }]);
      throw error;
    }
  });
});
```

## Automated Uploader Script

### Run Uploader
```bash
npm run testrail:upload
```

### How It Works
1. Reads test reports from `reports/` directory
2. Parses test results
3. Creates a new test run in TestRail
4. Uploads all results
5. Closes the run

### Customizing Parser
Edit `src/scripts/testrail/testrail-uploader.js` to match your report format:

```javascript
parseLogFile(content) {
  const results = [];
  const lines = content.split('\n');

  // Customize parsing logic for your report format
  for (const line of lines) {
    if (line.includes('✓') || line.includes('passing')) {
      results.push({
        case_id: results.length + 1,
        status_id: 1, // Passed
        comment: 'Test passed',
      });
    }
  }

  return results;
}
```

## Jenkins Integration

### Add to Jenkinsfile
```groovy
stage('TestRail Integration') {
    when {
        expression { params.UPDATE_TESTRAIL == true }
    }
    steps {
        echo '📊 Updating TestRail...'
        sh '''
            export TESTRAIL_URL=${TESTRAIL_URL}
            export TESTRAIL_USER=${TESTRAIL_USER}
            export TESTRAIL_PASSWORD=${TESTRAIL_PASSWORD}
            export TESTRAIL_PROJECT_ID=${TESTRAIL_PROJECT_ID}
            export TESTRAIL_SUITE_ID=${TESTRAIL_SUITE_ID}
            npm run testrail:upload
        '''
    }
}
```

### Jenkins Credentials
Add TestRail credentials in Jenkins:
1. Go to **Credentials → System → Global credentials**
2. Add each TestRail credential
3. Reference in Jenkinsfile using credentials binding

## Test Management Best Practices

### 1. Test Case Organization
- Organize test cases in suites by feature
- Use meaningful test case titles
- Include preconditions and expected results in TestRail

### 2. Test Naming Convention
Use consistent naming in both TestRail and your test code:
```typescript
const testCaseMap = {
  'Login - Valid Credentials': 1,
  'Login - Invalid Credentials': 2,
  'Deposit - Valid Amount': 3,
  'Deposit - Invalid Amount': 4,
};
```

### 3. Result Reporting
Always report:
- Status (passed/failed/blocked)
- Execution time
- Comments
- Error messages (for failures)

### 4. Run Management
- Create one run per test execution
- Include execution environment in run name
- Close runs after all results are added

## API Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 429 | Rate limited |
| 500 | Server error |

## Error Handling

### Connection Error
```typescript
try {
  const isConnected = await testrail.verifyConnection();
} catch (error) {
  Logger.error(`TestRail connection error: ${error.message}`);
}
```

### Authentication Error
```
Error: 401 Unauthorized
Solution: Verify credentials and API token in environment
```

### Rate Limiting
```
Error: 429 Too Many Requests
Solution: Implement retry logic with exponential backoff
```

## Troubleshooting

### Issue: Cannot Connect to TestRail
**Solution:**
- Verify TestRail URL (should start with https://)
- Check API access is enabled in TestRail
- Verify firewall/network access

### Issue: Authentication Failed
**Solution:**
- Verify username is correct email
- Ensure API token is valid
- Check token hasn't expired

### Issue: Project or Suite Not Found
**Solution:**
- Verify project and suite IDs are correct
- Ensure user has access to project
- Check suite belongs to correct project

### Issue: Results Not Appearing in TestRail
**Solution:**
- Check run was created successfully
- Verify test case IDs exist
- Check result status is valid (1, 3, 5, or 6)
- Review API response for errors

## Advanced Features

### Get Test Statuses
```typescript
const statuses = await testrail.getStatuses();
console.log(statuses);
// [
//   { id: 1, name: 'Passed', ... },
//   { id: 5, name: 'Failed', ... },
//   ...
// ]
```

### Custom Fields
TestRail supports custom fields. Add to result:
```typescript
const result = {
  testCaseId: 123,
  status: 'passed',
  custom_field_name: 'custom_value',
};
```

### Defect Linking
Link failed tests to defects:
```typescript
const result = {
  testCaseId: 123,
  status: 'failed',
  comment: 'Linked to defect #123',
  defects: 'BUG-123',
};
```

## Monitoring and Analytics

### Test Metrics Dashboard
TestRail provides built-in analytics:
- Pass/fail rates
- Test execution trends
- Test coverage
- Defect correlation

### Reports to Generate
1. Test execution report
2. Test coverage report
3. Defect report
4. Trend analysis

## Additional Resources

- [TestRail API Documentation](https://www.guidepoint.com/docs/testrail-api/)
- [TestRail Administration Guide](https://www.guidepoint.com/docs/testrail-administration/)
- [Axios HTTP Client](https://axios-http.com/)

---

**For more information, see the main README.md and framework documentation.**
