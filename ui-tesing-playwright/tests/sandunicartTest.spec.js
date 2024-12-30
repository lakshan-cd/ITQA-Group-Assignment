const { test, expect } = require('@playwright/test');

test.only('@web @sample test validate product details in cart', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Step 1: Navigate to the product page or homepage
    await page.goto("https://www.singersl.com");
    

    const productName=await page.locator(".tabs-body h3").nth(0).textContent();
    const productPrice=await page.locator(".tabs-body .price").nth(0).textContent();

    console.log(productName,productPrice)

    await page.locator(".tabs-body .add-to-cart-link").nth(0).click();
 await page.locator('a:has-text("your cart")').click();

 const cartPageProductName=await page.locator(".product-info-cart-middle h3").textContent();
 const cartPageProductPrice=await page.locator(".product-info-cart-middle .price-selling").textContent();

console.log(cartPageProductName,cartPageProductPrice,"ssssssssssssssssssss");
 
    expect(cartPageProductName).toBe(cartPageProductName);
    expect(cartPageProductPrice).toBe(cartPageProductPrice);
});



// // Step 4: Increase product quantity
    // const quantitySelector = '[data-key="1"][data-id="6624"]'; // Selector for the '+' icon
    // const quantityDisplaySelector = '[data-id="6624"] .qty-display'; // Selector for the quantity display

    // // Get initial quantity
    // const initialQuantity = parseInt(await page.textContent(quantityDisplaySelector));

    // // Click the '+' icon to increase quantity
    // await page.click(quantitySelector);

    // // Wait for the quantity to update
    // await page.waitForTimeout(1000); // Adjust timeout based on UI response time

    // // Get updated quantity
    // const updatedQuantity = parseInt(await page.textContent(quantityDisplaySelector));

    // // Assert that the quantity increased by 1
    // expect(updatedQuantity).toBe(initialQuantity + 1);
