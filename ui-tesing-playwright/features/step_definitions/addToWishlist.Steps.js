const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require("../../pageobjects/POManager");
const playwright = require('@playwright/test');


Given('User is logged in with valid session cookies', { timeout: 50000 }, async function () {
     const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    await context.addCookies([
        {
            name: 'singer_session',
            value: 'eyJpdiI6IkZOWVZDM3NWMXc4eTRBdHRrNnkxUUE9PSIsInZhbHVlIjoidnFnbGRjMDcvSVVTNlFUcTAyVDVkZG9QbFFqMzM5SVZxSmR1ZW5BSExIbXFoeGNMOXJWaWZ3OFljdTJJaXFaTS9UcjUwRWpUTXJLUGlxRTBHeHlQWStWd1d2VmxuS1BWSU04TEZHSGpkMFdaak9DWWRURytrckxnM1ZXRlA3QUEiLCJtYWMiOiJhM2EzMmZjYmIyMzRiMGY4ZmJiNzkyNjBkMThjMDdhY2RiNDRlYzAwMmRhMDRhOTZkM2NhZTZmYTkwMzYzMGUxIiwidGFnIjoiIn0%3D',
            domain: 'www.singersl.com',
            path: '/',
        },
    ]);
        const page = await context.newPage();
         this.poManager = new POManager(page);
        this.productPage = this.poManager.getProductPage();
        await this.productPage.goTo();
});


Given('User navigates to the Product Page', { timeout: 50000 }, async function () {
    await this.productPage.goTo();
});


When('User adds a product to the wishlist', { timeout: 50000 }, async function () {
    this.productName = await this.productPage.addToWhishListAndGetProductName();
    await this.productPage.navigateToMyAccount();
});

When('User navigates to the Wishlist page', { timeout: 50000 }, async function () {
     this.wishlistPage = this.poManager.getWishListPage();
    await this.wishlistPage.navigateToWishlistProducts();
});


Then('Verify the product is displayed in the Wishlist', { timeout: 50000 }, async function () {
    await this.wishlistPage.getWishlistProduct();
    await this.wishlistPage.verifyCorrectProduct(this.productName);
});