import { expect } from 'chai';
import { LoginPage } from '../../pages/LoginPage';

describe('Banking App - Login Tests', () => {
  let loginPage: LoginPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    await browser.url('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  });

  it('TC001 - Verify login page is displayed', async () => {
    const isDisplayed = await loginPage.isLoginFormDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('TC002 - Navigate to customer login', async () => {
    await loginPage.clickCustomerLoginButton();
    await browser.pause(1000);
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).to.include('customer');
  });

  it('TC003 - Navigate to manager login', async () => {
    await loginPage.clickManagerLoginButton();
    await browser.pause(1000);
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).to.include('manager');
  });

  it('TC004 - Verify login form elements are visible', async () => {
    await loginPage.clickCustomerLoginButton();
    const isFormDisplayed = await loginPage.isLoginFormDisplayed();
    expect(isFormDisplayed).to.be.true;
  });
});
