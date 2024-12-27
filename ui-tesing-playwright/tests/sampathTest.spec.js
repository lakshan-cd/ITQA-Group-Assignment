const { test, expect } = require('@playwright/test');
const { POManager} = require("../pageobjects/POManager")



test.only('@web @sample test1 After selecting a subcategory in the homepage categories, it should navigate to the relevant category and correctly filter the relevant subcategory.', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.hitad.lk/");
    const product = page.locator(".single-ads-product").nth(3);
    const categoryName = await product.locator(".title").textContent();
    const subCategoryName = await product.locator(".n-text").nth(1).textContent();
    await page.locator(".single-ads-product").nth(3).locator(".n-text").nth(1).click();
    await expect(page.locator(".breadcrumb a").nth(1)).toHaveText(categoryName);
    await expect(page.locator(".breadcrumb a").nth(2)).toHaveText(new RegExp(`${subCategoryName}?`, "i"));
    await expect(page.locator("#pet_categories option[selected]")).toHaveText(new RegExp(`${subCategoryName}?`, 'i'));

})




test('@web @sample test ', async ({ browser }) => {

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
    await page.goto("https://www.cameralk.com/");
    await page.locator("#myAccountDropdown").click();
    await page.locator("[data-target='#loginModal']").first().click();
    await page.locator("#login_email").fill("nalakasampathsmp@gmail.com");
    await page.locator("#login_password").fill("Sampa@12");
    await page.locator("#remember").click();
    await page.locator(".modal-content button").nth(3).click();
    const signInElement = page.locator('#myAccountDropdown  small');
    const textContent = await signInElement.textContent();
    console.log(`Extracted text: "${textContent}"`);
    await expect(signInElement).not.toHaveText('Sign in / Join Free');
})

test('@web  login test', async ({ browser }) => {
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

    const loggingPage = poManager.getLoginPage();
    await loggingPage.goTo();
    await loggingPage.goToLoggingModal();
    await loggingPage.submitLogin("nalakasampathsmp@gmail.com", "Sampa@12");
    await loggingPage.checkingNewUser();
});
