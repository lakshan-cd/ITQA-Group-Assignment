const { test, expect } = require('@playwright/test');
const { POManager } = require("../pageobjects/POManager")



test.only('@web @sample test sdssss ', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.singersl.com/products");

    await page.locator(".low-price").click();
    
    const sellingPrices = await page.locator(".selling-price", { hasText: /^RS/i }).allTextContents();
    const numericPrices = sellingPrices.map(price => parseFloat(price.replace(/Rs\.?\s?/i, '').trim()));

    const isSortedAscending = numericPrices.every((price, i, arr) => i === 0 || price >= arr[i - 1]);

    console.log(isSortedAscending,numericPrices);
    expect(isSortedAscending).toBeTruthy();
});

