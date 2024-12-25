const { test, expect } = require('@playwright/test');


test.only('@initial test', async ({ page }) => {

    //Reach page
    await page.goto("https://www.cameralk.com/");
 
})