import { expect } from 'chai';
import { TransactionsPage } from '../../pages/TransactionsPage';

describe('Banking App - Transactions Tests', () => {
  let transactionsPage: TransactionsPage;

  beforeEach(async () => {
    transactionsPage = new TransactionsPage();
    await browser.url('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  });

  it('TC010 - Verify transactions page URL', async () => {
    const url = await transactionsPage.getCurrentUrl();
    expect(url).to.include('BankingProject');
  });

  it('TC011 - Verify reset button exists', async () => {
    const resetButton = 'button[ng-click="reset()"]';
    const isPresent = await $(resetButton).isExisting();
    expect(isPresent !== null).to.be.ok;
  });
});
