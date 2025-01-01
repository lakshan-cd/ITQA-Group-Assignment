const { expect } = require("@playwright/test");

class MyWishlistPage {

    constructor(page) {
        this.page = page;
        this.myWishlistButton = page.locator(".my-wishlist");
        this.productName = page.locator(".wishlist-item h3");
        this.removeFromWishlistButton = page.locator(".wishlist-item #edit-items-11755-actions-remove")
    }

    async navigateToWishlistProducts() {
        this.myWishlistButton.click();
    }

    async getWishlistProduct() {
        this.wishlistProductName = await this.productName.textContent();
    }
    async verifyCorrectProduct(productName) {
        expect(this.wishlistProductName.trim().toLowerCase()).toBe(productName.trim().toLowerCase());
        await this.removeFromWishlistButton.click();

    }
 
}
module.exports = { MyWishlistPage };