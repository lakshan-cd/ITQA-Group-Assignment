const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require("../../pageobjects/POManager");
const playwright = require('@playwright/test');

Given('User navigates to the Product Listing Page', { timeout: 50000 }, async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    this.productPage = poManager.getProductPage();
    await this.productPage.goTo();
});

When('User sets the minimum price as {string} and maximum price as {string}', { timeout: 50000 }, async function (min, max) {
    await this.productPage.fillMinMax(min, max);
});

When('Get the product price list', { timeout: 50000 }, async function () {
    this.productList = await this.productPage.getProductPrices();
});

Then('If no products are found, verify the No Products Found message is displayed', { timeout: 50000 }, async function () {
    if (this.productList.length === 0) {
        await this.productPage.verifyNoProducts();
    }
});

Then('If products are found, verify all displayed products fall within the selected price range', { timeout: 50000 }, async function () {
    if (this.productList.length > 0) {
        await this.productPage.verifyProducts();
    }
});
