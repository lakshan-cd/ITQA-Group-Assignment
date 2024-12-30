const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require("../../pageobjects/POManager")
const playwright = require('@playwright/test');


Given('Go to Logging modal', {timeout:100*1000}, async function () {
    const browser = await playwright.chromium.launch({headless:false})
    const context = await browser.newContext();
    await context.addCookies([
        {
            name: 'popup_promotion_seen',
            value: 'yes',
            domain: 'www.cameralk.com',
            path: '/',
        },
    ]);
    const page = await context.newPage();
    const poManager = new POManager(page);

    this.loggingPage = poManager.getLoginPage();
    await this.loggingPage.goTo();
    await this.loggingPage.goToLoggingModal();
});

When('Fill the logging form and submit with {string} and {string}' ,{ timeout: 200 * 1000 }, async function (email, Password) {
    await this.loggingPage.submitLogin(email, Password);

});

Then('Verify the logged user display in the home page', async function () {
    await this.loggingPage.checkingNewUser();
});
