import { PlaywrightConfig } from "../utils/playwright.config";
import { Page, BrowserContext } from "playwright";
import { DataStore } from "../utils/dataStore";
import { expect } from "@playwright/test";
import { ProductLocators } from "../locators/product.locator";

export class ProductFilter {
  private playWrightConfig: PlaywrightConfig;
  private dataStore: DataStore;
  private page: Page = undefined as unknown as Page;
  private context: BrowserContext = undefined as unknown as BrowserContext;
  private wishlistProductName: any;
  private inputFieldMin: any;
  private inputFieldMax: any;
  constructor() {
    this.playWrightConfig = PlaywrightConfig.getInstance();
    this.dataStore = DataStore.getInstance();
  }

  public async goToProductPage(): Promise<any> {
    this.page = await this.playWrightConfig.getPage();
    await this.page.goto("https://www.singersl.com/products");
    await this.page.waitForTimeout(2000);
  }

  public async fillMinMax(min: any, max: any) {
    await this.page.locator(ProductLocators.MINIMUM_INPUT_FIELD).click();
    await this.page
      .locator(ProductLocators.MINIMUM_INPUT_FIELD)
      .press("Control+A");
    await this.page
      .locator(ProductLocators.MINIMUM_INPUT_FIELD)
      .press("Backspace");
    await this.page
      .locator(ProductLocators.MINIMUM_INPUT_FIELD)
      .type(min.toString());
      
      await this.page.locator(ProductLocators.MAXIMUM_INPUT_FIELD).click();
      await this.page.waitForTimeout(5000);
    await this.page
      .locator(ProductLocators.MAXIMUM_INPUT_FIELD)
      .press("Control+A");
    await this.page
      .locator(ProductLocators.MAXIMUM_INPUT_FIELD)
      .press("Backspace");
    await this.page
      .locator(ProductLocators.MAXIMUM_INPUT_FIELD)
      .type(max.toString());

    await this.saveMinMax();
    await this.page.locator(ProductLocators.FILTER_HEADLINE).click();
  }

  public async saveMinMax() {
    const rawMin = await this.page
      .locator(ProductLocators.MINIMUM_INPUT_FIELD)
      .inputValue();
    const rawMax = await this.page
      .locator(ProductLocators.MAXIMUM_INPUT_FIELD)
      .inputValue();
    this.inputFieldMin = parseFloat(rawMin.replace(/,/g, ""));
    this.inputFieldMax = parseFloat(rawMax.replace(/,/g, ""));

    console.log("Min:", this.inputFieldMin, "Max:", this.inputFieldMax);
  }

  public async getProductPrices(): Promise<any[]> {
      await this.page.waitForTimeout(5000);
    const sellingPrices = await this.page
    .locator(ProductLocators.PRODUCT_SELLING_PRICES, { hasText: /^RS/i })
    .allTextContents();
    const validSellingPrices = sellingPrices.filter(
      (price) => price.trim() !== "" && price.trim() !== "0"
    );

    const cleanedSellingPrices = validSellingPrices.map((price) =>
      parseFloat(price.replace(/(RS|Rs\.|,)/g, "").trim())
    );
    this.dataStore.setData("productSellingPrices", cleanedSellingPrices);
    return cleanedSellingPrices;
  }

  public async verifyNoProducts(): Promise<void> {
    await expect(
      this.page.locator(ProductLocators.NO_RESULT_TEXT)
    ).toBeVisible();
  }

  public async verifyProducts() :Promise <void> {
   const productSellingPrices= this.dataStore.getData("productSellingPrices");
    productSellingPrices.forEach((price: any) => {
      expect(price).toBeGreaterThanOrEqual(this.inputFieldMin);
      expect(price).toBeLessThanOrEqual(this.inputFieldMax);
    });
  }
}
