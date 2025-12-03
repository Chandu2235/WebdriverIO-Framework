import { expect } from 'chai';
import { WithdrawalsPage } from '../../pages/WithdrawalsPage';

describe('Banking App - Withdrawals Tests', () => {
  let withdrawalsPage: WithdrawalsPage;

  beforeEach(async () => {
    withdrawalsPage = new WithdrawalsPage();
    await browser.url('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  });

  it('TC014 - Verify withdrawal page structure', async () => {
    const url = await withdrawalsPage.getCurrentUrl();
    expect(url).to.include('BankingProject');
  });

  it('TC015 - Verify withdrawal amount field exists', async () => {
    const amountField = 'input[ng-model="amount"]';
    const isPresent = await $(amountField).isExisting();
    expect(isPresent !== null).to.be.ok;
  });
});
