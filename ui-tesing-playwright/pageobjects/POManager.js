const { LoginPage } = require('./LoginPage');
const { ProductPage } = require('./ProductPage');


class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.productPage = new ProductPage(this.page);

    }

    getLoginPage() {
        return this.loginPage;
    }

    getProductPage() {
        return this.productPage;
    }

}
module.exports = {POManager};