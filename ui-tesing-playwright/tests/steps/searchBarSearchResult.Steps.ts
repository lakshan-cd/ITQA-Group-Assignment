import { HomePage } from "../../src/homePage";
import { setDefaultTimeout } from "@cucumber/cucumber";

const { Given, When, Then } = require('@cucumber/cucumber');
setDefaultTimeout(1000 * 60);
const homePage = new HomePage();

Given('User navigates to home page', async function() {
    await homePage.gotoHomePage();
});

When('User enters the product name as {string} in the search bar', async function(productName: string) {
    await homePage.enterProductName(productName);
});

When('User clicks on enter button', async function() {
    await homePage.clickEnterButton();
});

Then('Verify the products are displayed for the searched product containing sku {string}', async function(sku: string) {
    await homePage.verifySearchedProduct(sku);
});