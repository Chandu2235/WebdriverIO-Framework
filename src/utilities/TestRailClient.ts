import axios, { AxiosInstance } from 'axios';
import { Logger } from '../utilities/Logger';

/**
 * TestRail API client configuration
 */
interface TestRailConfig {
  url: string;
  username: string;
  password: string;
  projectId: number;
  suiteId: number;
}

/**
 * TestRail test result
 */
interface TestResult {
  testCaseId: number;
  status: 'passed' | 'failed' | 'blocked' | 'skipped';
  comment?: string;
  executionTime?: number;
  errorMessage?: string;
}

/**
 * TestRail API Client
 */
export class TestRailClient {
  private client: AxiosInstance;
  private config: TestRailConfig;

  constructor(config: TestRailConfig) {
    this.config = config;
    const base64Auth = Buffer.from(
      `${config.username}:${config.password}`
    ).toString('base64');

    this.client = axios.create({
      baseURL: `${config.url}/index.php?/api/v2`,
      headers: {
        Authorization: `Basic ${base64Auth}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get all test cases in a suite
   */
  async getTestCases(): Promise<any[]> {
    try {
      const response = await this.client.get(
        `/get_cases/${this.config.projectId}&suite_id=${this.config.suiteId}`
      );
      Logger.success(`Fetched ${response.data.length} test cases from TestRail`);
      return response.data;
    } catch (error) {
      Logger.error(`Failed to get test cases: ${error}`);
      throw error;
    }
  }

  /**
   * Add test result to TestRail
   */
  async addResult(testResult: TestResult): Promise<void> {
    try {
      const payload = {
        status_id: this.mapStatusToId(testResult.status),
        comment: testResult.comment || '',
        elapsed: `${testResult.executionTime || 0}ms`,
      };

      if (testResult.errorMessage) {
        payload.comment += `\n\nError: ${testResult.errorMessage}`;
      }

      await this.client.post(
        `/add_result_for_case/${this.config.projectId}/${testResult.testCaseId}`,
        payload
      );

      Logger.debug(
        `Added result for test case ${testResult.testCaseId}: ${testResult.status}`
      );
    } catch (error) {
      Logger.error(`Failed to add result: ${error}`);
      throw error;
    }
  }

  /**
   * Add multiple test results in a run
   */
  async addResults(runId: number, results: any[]): Promise<void> {
    try {
      const payload = {
        results: results.map((result) => ({
          case_id: result.testCaseId,
          status_id: this.mapStatusToId(result.status),
          comment: result.comment || '',
          elapsed: `${result.executionTime || 0}ms`,
        })),
      };

      await this.client.post(`/add_results/${runId}`, payload);
      Logger.success(`Added ${results.length} test results to TestRail run`);
    } catch (error) {
      Logger.error(`Failed to add results: ${error}`);
      throw error;
    }
  }

  /**
   * Create test run
   */
  async createRun(
    runName: string,
    description: string = ''
  ): Promise<number> {
    try {
      const payload = {
        name: runName,
        description: description,
        suite_id: this.config.suiteId,
      };

      const response = await this.client.post(
        `/add_run/${this.config.projectId}`,
        payload
      );

      Logger.success(`Created TestRail run: ${response.data.id}`);
      return response.data.id;
    } catch (error) {
      Logger.error(`Failed to create test run: ${error}`);
      throw error;
    }
  }

  /**
   * Close test run
   */
  async closeRun(runId: number): Promise<void> {
    try {
      await this.client.post(`/close_run/${runId}`, {});
      Logger.success(`Closed TestRail run: ${runId}`);
    } catch (error) {
      Logger.error(`Failed to close run: ${error}`);
      throw error;
    }
  }

  /**
   * Get test statuses
   */
  async getStatuses(): Promise<any[]> {
    try {
      const response = await this.client.get('/get_statuses');
      return response.data;
    } catch (error) {
      Logger.error(`Failed to get statuses: ${error}`);
      throw error;
    }
  }

  /**
   * Map test status to TestRail status ID
   */
  private mapStatusToId(status: string): number {
    const statusMap: Record<string, number> = {
      passed: 1,
      failed: 5,
      blocked: 3,
      skipped: 6,
    };
    return statusMap[status.toLowerCase()] || 1;
  }

  /**
   * Verify TestRail connection
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.client.get('/get_projects');
      Logger.success('TestRail connection verified');
      return true;
    } catch (error) {
      Logger.error(`TestRail connection failed: ${error}`);
      return false;
    }
  }
}

export default TestRailClient;
