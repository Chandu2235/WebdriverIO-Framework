import { BasePage } from './BasePage';

/**
 * Transactions Page Object
 * Contains all locators and methods for transactions page
 */
export class TransactionsPage extends BasePage {
  // Locators
  private readonly transactionsTable = 'table.table';
  private readonly dateColumns = 'td:nth-child(1)';
  private readonly amountColumns = 'td:nth-child(2)';
  private readonly typeColumns = 'td:nth-child(3)';
  private readonly backButton = 'button[ng-click="back()"]';
  private readonly resetButton = 'button[ng-click="reset()"]';
  private readonly noTransactionsMessage = '.ng-binding';

  /**
   * Check if transactions table is displayed
   */
  async isTransactionsTableDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(this.transactionsTable);
  }

  /**
   * Get all transaction dates
   */
  async getAllTransactionDates(): Promise<string[]> {
    await this.waitForElementVisible(this.transactionsTable);
    return await this.getMultipleTexts(this.dateColumns);
  }

  /**
   * Get all transaction amounts
   */
  async getAllTransactionAmounts(): Promise<string[]> {
    return await this.getMultipleTexts(this.amountColumns);
  }

  /**
   * Get all transaction types
   */
  async getAllTransactionTypes(): Promise<string[]> {
    return await this.getMultipleTexts(this.typeColumns);
  }

  /**
   * Reset transactions
   */
  async resetTransactions(): Promise<void> {
    await this.clickElement(this.resetButton);
  }

  /**
   * Go back
   */
  async goBack(): Promise<void> {
    await this.clickElement(this.backButton);
  }

  /**
   * Get no transactions message
   */
  async getNoTransactionsMessage(): Promise<string> {
    return await this.getText(this.noTransactionsMessage);
  }
}
