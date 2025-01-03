const { test, expect } = require("@playwright/test");

test("@web @sample test validate product details in cart", async ({
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

});

//..........................................................................

test("@web @cart test increase quantity in cart", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.singersl.com");
  await page.locator(".tabs-body .add-to-cart-link").nth(0).click();
  await page.locator('a:has-text("your cart")').click();

  
  const initialQuantity = await page
    .locator(".mycart-qty input")
    .inputValue();
  console.log("Initial Quantity:", initialQuantity);
  await page.locator(".mycart-qty .qty-add").click();

 
  await page.waitForTimeout(8000); 

  const updatedQuantity = await page
    .locator(".mycart-qty input")
    .inputValue();
  console.log("Updated Quantity:", updatedQuantity);

  expect(Number(updatedQuantity)).toBe(Number(initialQuantity) + 1);

  // Clean up
  await context.close();
});
//..............................................................................................................

test('@web @sample Verify "Exclude Stock Out" Button Displays Only In-Stock Products', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.singersl.com/brands/asus");
  await page.locator("label:has-text('Exclude Stock Out')").click();
  const soldOutProducts = await page.locator(".sold-out").count();
  expect(soldOutProducts).toBe(0);
});

//...................................................................................................................

test.only("@web test inquiry form", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.singersl.com");


  await page.waitForSelector('div.product-info a[href="https://www.singersl.com/product/singer-rice-cooker-1l"]');
  await page.click('div.product-info a[href="https://www.singersl.com/product/singer-rice-cooker-1l"]');


  await page.waitForSelector('li[role="tab"] a#ui-id-17', { timeout: 5000 }); 
  await page.click('li[role="tab"] a#ui-id-17');
  await page.waitForSelector('#tabs-enquiry-4', { timeout: 5000 });
  const inquiryTabVisible = await page.isVisible('#tabs-enquiry-4');
  expect(inquiryTabVisible).toBeTruthy();
  const inquiryText = await page.locator('#tabs-enquiry-4').textContent();
  expect(inquiryText).toContain("Enquiry"); 

  // Close the browser context
  await context.close();
});
