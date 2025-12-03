import { BasePage } from './BasePage';

/**
 * Login Page Object
 * Contains all locators and methods for login page
 */
export class LoginPage extends BasePage {
  // Locators
  private readonly userNameField = 'input[ng-model="loginCtrl.userId"]';
  private readonly passwordField = 'input[ng-model="loginCtrl.userPassword"]';
  private readonly loginButton = 'button[type="submit"]';
  private readonly invalidLoginMsg = '.ng-binding.ng-scope';
  private readonly customerLoginLink = 'button[ng-click="customerLogin()"]';
  private readonly managerLoginLink = 'button[ng-click="managerLogin()"]';

  /**
   * Login with username and password
   */
  async login(username: string, password: string): Promise<void> {
    await this.waitForElementVisible(this.userNameField);
    await this.typeText(this.userNameField, username);
    await this.typeText(this.passwordField, password);
    await this.clickElement(this.loginButton);
    // Wait for login to process
    await this.pause(2000);
  }

  /**
   * Click on Customer Login button
   */
  async clickCustomerLoginButton(): Promise<void> {
    await this.clickElement(this.customerLoginLink);
  }

  /**
   * Click on Manager Login button
   */
  async clickManagerLoginButton(): Promise<void> {
    await this.clickElement(this.managerLoginLink);
  }

  /**
   * Get invalid login message
   */
  async getInvalidLoginMessage(): Promise<string> {
    return await this.getText(this.invalidLoginMsg);
  }

  /**
   * Check if login form is displayed
   */
  async isLoginFormDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(this.userNameField);
  }

  /**
   * Login as customer
   */
  async loginAsCustomer(username: string, password: string): Promise<void> {
    await this.clickCustomerLoginButton();
    await this.login(username, password);
  }

  /**
   * Login as manager
   */
  async loginAsManager(username: string, password: string): Promise<void> {
    await this.clickManagerLoginButton();
    await this.login(username, password);
  }
}
