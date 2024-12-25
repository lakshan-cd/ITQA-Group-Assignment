const { expect } = require("@playwright/test");

class LoginPage {

    constructor(page) {
        this.page = page;
        this.myAccountDropdown = page.locator("#myAccountDropdown");
        this.loggingButton = page.locator("[data-target='#loginModal']");
        this.email = page.locator("#login_email");
        this.password = page.locator("#login_password");
        this.rememberCheckBox = page.locator("#remember");
        this.loggingSubmitButton = page.locator(".modal-content button");
        this.loggedUserName = page.locator("#myAccountDropdown  small");

    }

    async goTo() {
        await this.page.goto("https://www.cameralk.com/");
    }

    async goToLoggingModal() {
        this.myAccountDropdown.click();
        this.loggingButton.first().click();
    }

    async submitLogin(email, password) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.rememberCheckBox.click();
        await this.loggingSubmitButton.nth(3).click();
      //  await this.page.waitForLoadState('networkidle');
    }

    async checkingNewUser() {
        const textContent = await this.loggedUserName.textContent();
        console.log(`Extracted text: "${textContent}"`);
        await expect(this.loggedUserName).not.toHaveText('Sign in / Join Free');
    }


}
module.exports = { LoginPage };