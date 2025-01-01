const { expect } = require("@playwright/test");

class ProductPage {

    constructor(page) {
        this.page = page;
        this.minimumInputField = page.locator("#amount-min");
        this.maximumInputField = page.locator("#amount-max");
        this.filterHeadline = page.locator(".filters .fitler-header");
        this.productSellingPrices = page.locator(".selling-price", { hasText: /^RS/i });
        this.noResultText = page.locator(".no-results");
        this.productNameLocator = page.locator(".product-item h2")
        this.addToWishlistIcon = page.locator(".product-item .icon-wishlist")
        this.myAccountButton = page.locator("a:has-text('My Account')")

    }

    async goTo() {
        await this.page.goto("https://www.singersl.com/products");
        await this.page.waitForSelector(".product-item");
    }
    async goToElectronicsProducts() {
        await this.page.goto("https://www.singersl.com/products/electronics");
        await this.page.waitForSelector(".product-item");
    }
    async fillMinMax(min, max) {
        await this.minimumInputField.click();
        await this.minimumInputField.press("Control+A");
        await this.minimumInputField.press("Backspace");
        await this.minimumInputField.type(min.toString());


        await this.maximumInputField.click();
        await this.maximumInputField.press("Control+A");
        await this.maximumInputField.press("Backspace");
        await this.maximumInputField.type(max.toString());

        await this.saveMinMax();
        await this.filterHeadline.click();
    }
    async saveMinMax() {
        const rawMin = await this.minimumInputField.inputValue();
        const rawMax = await this.maximumInputField.inputValue();
        this.inputFieldMin = parseFloat(rawMin.replace(/,/g, ""));
        this.inputFieldMax = parseFloat(rawMax.replace(/,/g, ""));

        console.log("Min:", this.inputFieldMin, "Max:", this.inputFieldMax);
    }
    async verifyNoProducts() {
        await expect(this.noResultText).toBeVisible();
    }

    async getProductPrices() {
        const sellingPrices = await this.productSellingPrices.allTextContents();
        const validSellingPrices = sellingPrices.filter(price => price.trim() !== '' && price.trim() !== '0');
        this.cleanedSellingPrices = validSellingPrices.map(price =>
            parseFloat(price.replace(/(RS|Rs\.|,)/g, '').trim())
        );
        return this.cleanedSellingPrices;
    }

    async verifyProducts() {
        this.cleanedSellingPrices.forEach(price => {
            expect(price).toBeGreaterThanOrEqual(this.inputFieldMin);
            expect(price).toBeLessThanOrEqual(this.inputFieldMax);
        });
    }

    async addToWhishListAndGetProductName() {
        await this.addToWishlistIcon.nth(3).click();
        return await this.productNameLocator.nth(3).textContent();
    }

    async navigateToMyAccount() {
        await this.myAccountButton.click();
    }

}
module.exports = { ProductPage };