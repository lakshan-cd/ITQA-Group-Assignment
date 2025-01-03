const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require("../../pageobjects/POManager");
const playwright = require('@playwright/test');

Given('User is on the Product Page', { timeout: 50000 }, async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    this.productPage = poManager.getProductPage();
    await this.productPage.goTo();
});

When('User retrieves details of the products', { timeout: 50000 }, async function () {
    this.firstProduct = await this.productPage.getProductDetails(0);
    this.secondProduct = await this.productPage.getProductDetails(1);
});

When('User add the products to the comparison list', { timeout: 50000 }, async function () {
    await this.productPage.productAddToCompare(0);
    await this.productPage.productAddToCompare(1);
});

When('User navigates to the Product Comparison page', { timeout: 50000 }, async function () {
    await this.productPage.addToCompare();
});

When('User retrieves details of the products in compare model', { timeout: 50000 }, async function () {
    this.firstProductCompare = await this.productPage.getProductDetailsInCompare(0);
    this.secondProductCompare = await this.productPage.getProductDetailsInCompare(1);
});

Then('Verify the products details are displayed correctly in the comparison list', { timeout: 50000 }, async function () {
    await this.productPage.verifyProductDetails(this.firstProduct, this.firstProductCompare)
    await this.productPage.verifyProductDetails(this.secondProduct, this.secondProductCompare)
});
