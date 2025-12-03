import { BasePage } from './BasePage';

/**
 * Deposits Page Object
 * Contains all locators and methods for deposits page
 */
export class DepositsPage extends BasePage {
  // Locators
  private readonly accountNumberDropdown = 'select[ng-model="accountNo"]';
  private readonly amountField = 'input[ng-model="amount"]';
  private readonly depositButton = 'button[type="submit"]';
  private readonly backButton = 'button[ng-click="back()"]';
  private readonly successMessage = '.ng-binding';

  /**
   * Select account for deposit
   */
  async selectAccount(accountNumber: string): Promise<void> {
    const dropdown = await $(this.accountNumberDropdown);
    await dropdown.selectByVisibleText(accountNumber);
  }

  /**
   * Enter deposit amount
   */
  async enterAmount(amount: string): Promise<void> {
    await this.typeText(this.amountField, amount);
  }

  /**
   * Click deposit button
   */
  async clickDepositButton(): Promise<void> {
    await this.clickElement(this.depositButton);
    await this.pause(2000);
  }

  /**
   * Make deposit
   */
  async makeDeposit(accountNumber: string, amount: string): Promise<void> {
    await this.selectAccount(accountNumber);
    await this.enterAmount(amount);
    await this.clickDepositButton();
  }

  /**
   * Get success message
   */
  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.successMessage);
  }

  /**
   * Go back
   */
  async goBack(): Promise<void> {
    await this.clickElement(this.backButton);
  }
}
