import { BasePage } from './BasePage';

/**
 * Accounts Page Object
 * Contains all locators and methods for accounts page
 */
export class AccountsPage extends BasePage {
  // Locators
  private readonly accountsTable = 'table.table';
  private readonly accountNumberCells = 'td:nth-child(1)';
  private readonly accountTypeCells = 'td:nth-child(2)';
  private readonly balanceCells = 'td:nth-child(3)';
  private readonly backButton = 'button[ng-click="back()"]';
  private readonly noAccountsMessage = '.ng-binding';

  /**
   * Check if accounts table is displayed
   */
  async isAccountsTableDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(this.accountsTable);
  }

  /**
   * Get all account numbers
   */
  async getAllAccountNumbers(): Promise<string[]> {
    await this.waitForElementVisible(this.accountsTable);
    return await this.getMultipleTexts(this.accountNumberCells);
  }

  /**
   * Get all account types
   */
  async getAllAccountTypes(): Promise<string[]> {
    return await this.getMultipleTexts(this.accountTypeCells);
  }

  /**
   * Get all account balances
   */
  async getAllAccountBalances(): Promise<string[]> {
    return await this.getMultipleTexts(this.balanceCells);
  }

  /**
   * Click on specific account
   */
  async clickOnAccount(accountNumber: string): Promise<void> {
    const accountRow = `xpath=//td[contains(text(), '${accountNumber}')]`;
    await this.clickElement(accountRow);
  }

  /**
   * Go back
   */
  async goBack(): Promise<void> {
    await this.clickElement(this.backButton);
  }

  /**
   * Get no accounts message
   */
  async getNoAccountsMessage(): Promise<string> {
    return await this.getText(this.noAccountsMessage);
  }
}
