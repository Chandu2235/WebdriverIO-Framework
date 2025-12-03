import type { Options } from '@wdio/types';
import type { Browser } from 'webdriverio';

// Declare the global `browser` so TypeScript can resolve it in WDIO hooks
declare const browser: Browser;

export const config: Options.Testrunner = {
  runner: 'local',
  port: 4444,
  specs: [
    './src/tests/specs/**/*.spec.ts',
  ],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--start-maximized',
          '--no-sandbox',
        ],
      },
    },
  ],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    require: ['ts-node/register'],
  },
  reporters: [
    [
      'spec',
      {
        outputDir: './reports',
      },
    ],
    [
      'allure',
      {
        outputDir: 'allure-results',
        issueLinkTemplate: 'https://example.com/browse/%s',
        tmsLinkTemplate: 'https://example.com/browse/%s',
        title: 'Banking App POM Test Report',
        disableWebSocketsHandshake: true,
      },
    ],
  ],

  /**
   * Gets executed once before all workers get launched.
   */
  onPrepare: function (config, capabilities) {
    console.log('Starting WebdriverIO tests for Banking Application');
  },

  /**
   * Gets executed before a test suite is started
   */
  beforeSuite: function (suite) {
    console.log(`Starting test suite: ${suite.title}`);
  },

  /**
   * Function to be executed before a test (in Mocha)
   */
  beforeTest: function (test) {
    console.log(`Starting test: ${test.title}`);
  },

  /**
   * Function to be executed after a test (in Mocha)
   */
  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filepath = `./reports/screenshot_${timestamp}.png`;
      await browser.saveScreenshot(filepath);
      console.log(`Screenshot saved: ${filepath}`);
    }
  },

  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   */
  after: function (result) {
    console.log('All tests completed');
  },
};
