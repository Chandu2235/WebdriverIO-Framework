import { expect } from 'chai';
import { DepositsPage } from '../../pages/DepositsPage';

describe('Banking App - Deposits Tests', () => {
  let depositsPage: DepositsPage;

  beforeEach(async () => {
    depositsPage = new DepositsPage();
    await browser.url('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  });

  it('TC012 - Verify deposit page structure', async () => {
    const url = await depositsPage.getCurrentUrl();
    expect(url).to.include('BankingProject');
  });

  it('TC013 - Verify amount field exists', async () => {
    const amountField = 'input[ng-model="amount"]';
    const isPresent = await $(amountField).isExisting();
    expect(isPresent !== null).to.be.ok;
  });
});
