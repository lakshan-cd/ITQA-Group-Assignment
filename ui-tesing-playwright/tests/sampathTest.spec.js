const { test, expect } = require('@playwright/test');


test('@initial test', async ({ browser }) => {
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