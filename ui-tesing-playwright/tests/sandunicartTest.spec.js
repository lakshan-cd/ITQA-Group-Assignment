const { test, expect } = require("@playwright/test");

test.only("@web @sample test validate product details in cart", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Step 1: Navigate to the product page or homepage
  await page.goto("https://www.singersl.com");

  const productName = await page.locator(".tabs-body h3").nth(0).textContent();
  const productPrice = await page
    .locator(".tabs-body .price")
    .nth(0)
    .textContent();

  console.log(productName, productPrice);

  await page.locator(".tabs-body .add-to-cart-link").nth(0).click();
  await page.locator('a:has-text("your cart")').click();

  const cartPageProductName = await page
    .locator(".product-info-cart-middle h3")
    .textContent();
  const cartPageProductPrice = await page
    .locator(".product-info-cart-middle .price-selling")
    .textContent();

  console.log(
    cartPageProductName,
    cartPageProductPrice,
    "ssssssssssssssssssss"
  );

  expect(cartPageProductName).toBe(cartPageProductName);
  expect(cartPageProductPrice).toBe(cartPageProductPrice);

  //...............................................................................................
  // Step 5: Increase product quantity
  const initialQuantity = await page
    .locator(".quantity-input input")
    .inputValue();
  console.log("Initial quantity:", initialQuantity);

  await page.locator(".qty-add").click(); 

  await page.waitForTimeout(1000); 
  const updatedQuantity = await page
    .locator(".quantity-input input")
    .inputValue();
  console.log("Updated quantity:", updatedQuantity);

 
  expect(Number(updatedQuantity)).toBe(Number(initialQuantity) + 1);

  
  const updatedCartPageProductPrice = await page
    .locator(".product-info-cart-middle .price-selling")
    .textContent();
  console.log("Updated cart price:", updatedCartPageProductPrice);

  
  
});

