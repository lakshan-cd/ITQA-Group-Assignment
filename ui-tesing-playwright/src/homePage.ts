import {PlaywrightConfig} from "../utils/playwright.config";
import {DataStore} from "../utils/dataStore";
import {BrowserContext, Page} from "playwright";
import {HomePageLocators} from "../locators/homepage.locator";
const {expect} = require("@playwright/test");

export class HomePage {
    private playWrightConfig : PlaywrightConfig;
    private dataStore: DataStore;
    private page: Page = undefined as unknown as Page;
    private context: BrowserContext = undefined as unknown as BrowserContext;

    constructor() {
        this.playWrightConfig = PlaywrightConfig.getInstance();
        this.dataStore = DataStore.getInstance();
    }

    public async gotoHomePage() {
        this.page = await this.playWrightConfig.getPage();
        await this.page.goto('https://www.singersl.com/');
    }

    public async selectCurrency(currency : string) {
        await this.page
            .locator(HomePageLocators.CURRENCY_SELECTION)
            .selectOption({ value: currency.toLowerCase() });
    }

    public async verifyCurrency(currency : string) {
        await this.page.waitForTimeout(6000);
        const currencyItem = currency == "USD" ? "$" : "Rs.";
        const product = await this.page
            .locator(HomePageLocators.PRODUCT_PRICE)
            .first().textContent();
        expect(product).toContain(currencyItem);
    }

    public async enterProductName(productName: string) {
        await this.page
            .locator(HomePageLocators.SEARCHBAR_ID)
            .fill(productName);
    }

    public async clickEnterButton() {
        await this.page
            .locator(HomePageLocators.SEARCHBAR_ID)
            .press('Enter');
    }

    public async verifySearchedProduct(sku: string) {
        await this.page.waitForTimeout(6000);
        const results = await this.page
            .locator(HomePageLocators.SEARCHED_RESULT)
            .allTextContents();
        const isProductDisplayed = results.some(result => result.includes(sku));
        expect(isProductDisplayed).toBe(true);
    }
}

module.exports = { HomePage: HomePage };