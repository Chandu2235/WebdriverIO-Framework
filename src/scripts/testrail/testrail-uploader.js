#!/usr/bin/env node

/**
 * TestRail Uploader Script
 * Uploads test results to TestRail
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { Logger } = require('../utilities/Logger');

class TestRailUploader {
  constructor() {
    this.testrailUrl = process.env.TESTRAIL_URL || 'https://testrail.com';
    this.username = process.env.TESTRAIL_USER || '';
    this.password = process.env.TESTRAIL_PASSWORD || '';
    this.projectId = parseInt(process.env.TESTRAIL_PROJECT_ID) || 0;
    this.suiteId = parseInt(process.env.TESTRAIL_SUITE_ID) || 0;

    const base64Auth = Buffer.from(`${this.username}:${this.password}`).toString(
      'base64'
    );

    this.client = axios.create({
      baseURL: `${this.testrailUrl}/index.php?/api/v2`,
      headers: {
        Authorization: `Basic ${base64Auth}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async uploadResults() {
    try {
      Logger.info('📊 Starting TestRail upload...');

      // Verify connection
      await this.verifyConnection();

      // Parse test results from reports
      const results = this.parseTestResults();

      if (results.length === 0) {
        Logger.warn('No test results found to upload');
        return;
      }

      // Create test run
      const runName = `Automated Test Run - ${new Date().toISOString()}`;
      const runId = await this.createRun(runName);

      // Upload results
      await this.addResults(runId, results);

      // Close run
      await this.closeRun(runId);

      Logger.success(`✅ TestRail upload completed! Run ID: ${runId}`);
    } catch (error) {
      Logger.error(`TestRail upload failed: ${error}`);
      process.exit(1);
    }
  }

  parseTestResults() {
    const results = [];
    const reportDir = path.join(process.cwd(), 'reports');

    if (!fs.existsSync(reportDir)) {
      Logger.warn('Reports directory not found');
      return results;
    }

    // Parse spec reporter output
    const files = fs.readdirSync(reportDir);
    for (const file of files) {
      if (file.endsWith('.log')) {
        const filePath = path.join(reportDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const parsed = this.parseLogFile(content);
        results.push(...parsed);
      }
    }

    return results;
  }

  parseLogFile(content) {
    const results = [];
    const lines = content.split('\n');

    // Simple parsing logic - adapt based on your report format
    for (const line of lines) {
      if (line.includes('✓') || line.includes('passing')) {
        // Passed test
        results.push({
          case_id: results.length + 1,
          status_id: 1, // Passed
          comment: 'Test passed',
        });
      } else if (line.includes('✗') || line.includes('failing')) {
        // Failed test
        results.push({
          case_id: results.length + 1,
          status_id: 5, // Failed
          comment: line,
        });
      }
    }

    return results;
  }

  async createRun(runName) {
    try {
      const response = await this.client.post(`/add_run/${this.projectId}`, {
        name: runName,
        suite_id: this.suiteId,
      });
      Logger.success(`Created TestRail run: ${response.data.id}`);
      return response.data.id;
    } catch (error) {
      Logger.error(`Failed to create run: ${error}`);
      throw error;
    }
  }

  async addResults(runId, results) {
    try {
      const payload = {
        results: results.map((r) => ({
          case_id: r.case_id,
          status_id: r.status_id,
          comment: r.comment,
        })),
      };

      await this.client.post(`/add_results/${runId}`, payload);
      Logger.success(`Uploaded ${results.length} test results`);
    } catch (error) {
      Logger.error(`Failed to add results: ${error}`);
      throw error;
    }
  }

  async closeRun(runId) {
    try {
      await this.client.post(`/close_run/${runId}`, {});
      Logger.success(`Closed test run: ${runId}`);
    } catch (error) {
      Logger.error(`Failed to close run: ${error}`);
      throw error;
    }
  }

  async verifyConnection() {
    try {
      await this.client.get('/get_projects');
      Logger.success('✅ TestRail connection verified');
    } catch (error) {
      Logger.error(`❌ TestRail connection failed: ${error}`);
      throw error;
    }
  }
}

async function main() {
  const uploader = new TestRailUploader();
  await uploader.uploadResults();
}

main().catch((error) => {
  Logger.error(`Script failed: ${error}`);
  process.exit(1);
});
