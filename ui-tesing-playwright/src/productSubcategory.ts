import { PlaywrightConfig } from "../utils/playwright.config";
import { Page } from "playwright";
import { DataStore } from "../utils/dataStore";
import { expect } from "@playwright/test";
import { ProductSubcategoryLocator } from "../locators/productSubcategory.locator";

export class ProductSubcategory {
  private playWrightConfig: PlaywrightConfig;
  private dataStore: DataStore;
  private page: Page = undefined as unknown as Page;

  constructor() {
    this.playWrightConfig = PlaywrightConfig.getInstance();
    this.dataStore = DataStore.getInstance();
  }
  public async goToProductPage(): Promise<any> {
    this.page = await this.playWrightConfig.getPage();
    await this.page.goto(
      "https://www.singersl.com/product/unic-rice-cooker-28l-1000w-urc28-16e"
    );
    await this.page.waitForTimeout(2000);
  }
  public async saveProductPrice(): Promise<any> {
    const preProductPrice = await this.page
      .locator(ProductSubcategoryLocator.PRODUCT_SUB_CATEGORY_PRICE)
      .first()
      .textContent();
    this.dataStore.setData("firstSubCategoryPrice", preProductPrice);
    await this.page.waitForTimeout(2000);
  }

  public async navigateNextSubCategory(): Promise<any> {
    await this.page
      .locator(ProductSubcategoryLocator.PRODUCT_SUB_CATEGORY)
      .nth(1)
      .click();
    await this.page.waitForTimeout(10000);
  }

  public async verifyProductPrice(): Promise<any> {
    const newProductPrice = await this.page
      .locator(ProductSubcategoryLocator.PRODUCT_SUB_CATEGORY_PRICE)
      .first()
      .textContent();
    const preProductPrice = this.dataStore.getData("firstSubCategoryPrice");
    expect(preProductPrice).not.toBe(newProductPrice);
  }
}
