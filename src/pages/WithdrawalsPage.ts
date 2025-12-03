import { BasePage } from './BasePage';

/**
 * Withdrawals Page Object
 * Contains all locators and methods for withdrawals page
 */
export class WithdrawalsPage extends BasePage {
  // Locators
  private readonly accountNumberDropdown = 'select[ng-model="accountNo"]';
  private readonly amountField = 'input[ng-model="amount"]';
  private readonly withdrawButton = 'button[type="submit"]';
  private readonly backButton = 'button[ng-click="back()"]';
  private readonly successMessage = '.ng-binding';
  private readonly errorMessage = '.error';

  /**
   * Select account for withdrawal
   */
  async selectAccount(accountNumber: string): Promise<void> {
    const dropdown = await $(this.accountNumberDropdown);
    await dropdown.selectByVisibleText(accountNumber);
  }

  /**
   * Enter withdrawal amount
   */
  async enterAmount(amount: string): Promise<void> {
    await this.typeText(this.amountField, amount);
  }

  /**
   * Click withdraw button
   */
  async clickWithdrawButton(): Promise<void> {
    await this.clickElement(this.withdrawButton);
    await this.pause(2000);
  }

  /**
   * Make withdrawal
   */
  async makeWithdrawal(accountNumber: string, amount: string): Promise<void> {
    await this.selectAccount(accountNumber);
    await this.enterAmount(amount);
    await this.clickWithdrawButton();
  }

  /**
   * Get success message
   */
  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.successMessage);
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  /**
   * Go back
   */
  async goBack(): Promise<void> {
    await this.clickElement(this.backButton);
  }
}
