import { BasePage } from './BasePage';

/**
 * Customer Dashboard Page Object
 * Contains all locators and methods for customer dashboard
 */
export class CustomerDashboardPage extends BasePage {
  // Locators
  private readonly customerNameDropdown = 'select[ng-model="custId"]';
  private readonly loginButton = 'button[type="submit"]';
  private readonly logoutButton = 'button[ng-click="logout()"]';
  private readonly accountsLink = 'button[ng-click="goToAccounts()"]';
  private readonly depositsLink = 'button[ng-click="goToDeposits()"]';
  private readonly withdrawalLink = 'button[ng-click="goToWithdrawal()"]';
  private readonly transactionsLink = 'button[ng-click="goToTransactions()"]';
  private readonly welcomeMessage = '.ng-scope';

  /**
   * Select customer from dropdown
   */
  async selectCustomer(customerName: string): Promise<void> {
    const dropdown = await $(this.customerNameDropdown);
    await dropdown.selectByVisibleText(customerName);
  }

  /**
   * Click Login button after selecting customer
   */
  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
    await this.pause(2000);
  }

  /**
   * Login as specific customer
   */
  async loginAsSpecificCustomer(customerName: string): Promise<void> {
    await this.selectCustomer(customerName);
    await this.clickLoginButton();
  }

  /**
   * Logout from application
   */
  async logout(): Promise<void> {
    await this.clickElement(this.logoutButton);
    await this.pause(1000);
  }

  /**
   * Navigate to Accounts
   */
  async navigateToAccounts(): Promise<void> {
    await this.clickElement(this.accountsLink);
  }

  /**
   * Navigate to Deposits
   */
  async navigateToDeposits(): Promise<void> {
    await this.clickElement(this.depositsLink);
  }

  /**
   * Navigate to Withdrawal
   */
  async navigateToWithdrawal(): Promise<void> {
    await this.clickElement(this.withdrawalLink);
  }

  /**
   * Navigate to Transactions
   */
  async navigateToTransactions(): Promise<void> {
    await this.clickElement(this.transactionsLink);
  }

  /**
   * Check if dashboard is displayed
   */
  async isDashboardDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(this.logoutButton);
  }

  /**
   * Get welcome message
   */
  async getWelcomeMessage(): Promise<string> {
    return await this.getText(this.welcomeMessage);
  }
}
