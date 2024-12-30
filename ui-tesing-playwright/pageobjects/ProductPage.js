const { expect } = require("@playwright/test");

class ProductPage {

    constructor(page) {
        this.page = page;
        this.minimumInputField = page.locator("#amount-min");
        this.maximumInputField = page.locator("#amount-max");
        this.filterHeadline = page.locator(".filters .fitler-header");
        this.productSellingPrices = page.locator(".selling-price", { hasText: /^RS/i });
        this.noResultText = page.locator(".no-results");
    }

    async goTo() {
        await this.page.goto("https://www.singersl.com/products");
    }

    async fillMinMax(min, max) {
        this.min = min;
        this.max = max;
        await this.minimumInputField.fill(this.min.toString());
        await this.maximumInputField.fill(this.max.toString());
        await this.filterHeadline.click(); // unfocus the input field
    }

    async checkInvalidPrices() {
        if (isNaN(this.min) || this.min < 0 || isNaN(this.max) || this.max < this.min) {
            return false;
        } else {
            return true
        }
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
        console.log(this.cleanedSellingPrices);
    }

    async verifyProducts() {
        this.cleanedSellingPrices.forEach(price => {
            expect(price).toBeGreaterThanOrEqual(this.min);
            expect(price).toBeLessThanOrEqual(this.max);
        });

    }

}
module.exports = { ProductPage };