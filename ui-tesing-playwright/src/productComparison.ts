import { PlaywrightConfig } from "../utils/playwright.config";
import { Page, BrowserContext } from "playwright";
import { DataStore } from "../utils/dataStore";
import { expect } from "@playwright/test";
import { ProductLocators } from "../locators/product.locator";

export class ProductComparison {
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
  public async getProductDetails(index: number): Promise<any> {
    const name: any = await this.page
      .locator(ProductLocators.PRODUCT_NAME)
      .nth(index)
      .textContent();
    const code: any = await this.page
      .locator(ProductLocators.PRODUCT_CODE)
      .nth(index)
      .textContent();
    const price: any = await this.page
      .locator(ProductLocators.PRODUCT_PRICE)
      .nth(index)
      .textContent();

    return {
      name: name.trim(),
      code: code.trim(),
      price: price.replace("RS", "").trim(),
    };
  }

  public async productAddToCompare(index: number): Promise<void> {
    await this.page
      .locator(ProductLocators.PRODUCT)
      .nth(index)
      .hover()
      .then(async () => {
        await this.page
          .locator(ProductLocators.ADD_TO_COMPARE_CHECKBOX)
          .nth(index)
          .check();
      });
    await this.page
      .locator(ProductLocators.COMPARE_PRODUCT_PHOTO)
      .nth(index)
      .waitFor({ state: "visible" });
  }

  public async addToCompare(): Promise<void> {
    await this.page.locator(ProductLocators.COMPARE_BUTTON).click();
  }

  public async getProductDetailsInCompare(index: number): Promise<any> {
    const name: any = await this.page
      .locator(ProductLocators.PRODUCT_NAME_IN_COMPARE)
      .nth(index)
      .textContent();
    const code: any = await this.page
      .locator(ProductLocators.PRODUCT_CODE_IN_COMPARE)
      .nth(index)
      .textContent();
    const price: any = await this.page
      .locator(ProductLocators.PRODUCT_PRICE_IN_COMPARE)
      .nth(index)
      .textContent();
    return {
      name: name.trim(),
      code: code.trim(),
      price: price.replace("RS", "").trim(),
    };
  }
 public async verifyProductDetails(productData:any, productDataInCompare:any):Promise<any>{
   expect(productData).toEqual(productDataInCompare);
   await this.page.locator(ProductLocators.COMPARE_CLEAR).click();
  }
}
