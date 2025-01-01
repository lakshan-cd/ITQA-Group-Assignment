const { test, expect } = require('@playwright/test');
const { POManager } = require("../pageobjects/POManager")



test('@web @sample check product price odering ', async ({ browser }) => {
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



test('@web @sample Verify a brand Displays Only that brand Products ', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.singersl.com/brands");
    await page.locator('img[alt="ASUS"]').click();
    const brandName = (await page.locator("#block-breadcrumbs li").nth(2).textContent())
        .toLowerCase()
        .trim();
    const productNames = await page.locator(".product-item h2").allTextContents();
    const allIncludeBrandName = productNames.every(productName =>
        productName.toLowerCase().includes(brandName)
    );
    expect(allIncludeBrandName).toBeTruthy();
    console.log(allIncludeBrandName);
});

test('@web @sample Verify "Exclude Stock Out" Button Displays Only In-Stock Products', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.singersl.com/brands/asus");
    await page.locator("label:has-text('Exclude Stock Out')").click();
    const soldOutProducts = await page.locator(".sold-out").count();
    expect(soldOutProducts).toBe(0);
});


// test.only('@web @sample test sdssssddd ', async ({ browser }) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto("https://www.singersl.com/product/unic-rice-cooker-28l-1000w-urc28-16e");
//     const preProductPrice=await page.locator(".selling-price .data").textContent();
//     await page.locator(".product-variant-anchor").first().click();
//     const newProductPrice=await page.locator(".selling-price .data").textContent();
// console.log(preProductPrice,newProductPrice);


  
// });
