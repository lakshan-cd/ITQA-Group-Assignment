const { LoginPage } = require('./LoginPage');
const { ProductPage } = require('./ProductPage');
const { MyWishlistPage } = require('./MyWishlistPage');



class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.productPage = new ProductPage(this.page);
        this.myWishlist = new MyWishlistPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }
    getProductPage() {
        return this.productPage;
    }
    getWishListPage() {
        return this.myWishlist;
    }

}
module.exports = {POManager};