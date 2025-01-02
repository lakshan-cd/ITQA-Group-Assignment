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
        this.productName = page.locator(".product-listing-content .product-item h2");
        this.productCode = page.locator(".product-listing-content .product-item .sku");
        this.productPrice = page.locator(".product-listing-content .product-item .selling-price");
        this.product = page.locator(".product-item");
        this.addToCompareCheckBox = page.locator(".all_compare_checkbox");
        this.compareProductPhoto = page.locator("#comparediv img");
        this.compareButton = page.locator("#compare-button");
        this.productNameInCompare = page.locator("span h2");
        this.productCodeInCompare = page.locator("span .sku");
        this.productPriceInCompare = page.locator("span .selling-price");



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

    async getProductDetails (index) {
        const name = await this.productName.nth(index).textContent();
        const code = await this.productCode.nth(index).textContent();
        const price = await this.productPrice.nth(index).textContent();
        return { name: name.trim(), code: code.trim(), price: price.replace("RS", "").trim() };
    };
    async productAddToCompare(index) {
        await this.product.nth(index).hover().then(async () => {
            await this.addToCompareCheckBox.nth(index).check();
        });
        await this.compareProductPhoto.nth(index).waitFor({ state: 'visible' });
    }
    async addToCompare() {
        await this.compareButton.click();
    }

    async getProductDetailsInCompare(index) {
        const name = await this.productNameInCompare.nth(index).textContent();
        const code = await this.productCodeInCompare.nth(index).textContent();
        const price = await this.productPriceInCompare.nth(index).textContent();
        return {
            name: name.trim(),
            code: code.trim(),
            price: price.replace("RS", "").trim(),
        };
    }
    async verifyProductDetails(productData,productDataInCompare) {
     expect(productData).toEqual(productDataInCompare);
    }

}
module.exports = { ProductPage };