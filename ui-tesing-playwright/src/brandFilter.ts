import { PlaywrightConfig } from "../utils/playwright.config";
import { Page } from "playwright";
import { DataStore } from "../utils/dataStore";
import { expect } from "@playwright/test";
import { BrandLocators } from "../locators/brand.locator";

export class BrandFilter {
  private playWrightConfig: PlaywrightConfig;
  private dataStore: DataStore;
  private page: Page = undefined as unknown as Page;

  constructor() {
    this.playWrightConfig = PlaywrightConfig.getInstance();
    this.dataStore = DataStore.getInstance();
  }

  public async goToBrandsPage(): Promise<any> {
    this.page = await this.playWrightConfig.getPage();
    await this.page.goto("https://www.singersl.com/brands");
    await this.page.waitForTimeout(2000);
  }
  public async goToSpecificBrandPage(): Promise<void> {
    await this.page.locator(BrandLocators.BRAND_ICON).click();
  }
  public async retrievesBrandName(): Promise<void> {
    const brandName: string | null = await this.page
      .locator(BrandLocators.BRAND_NAME)
      .nth(2)
      .textContent();

    if (brandName) {
      const processedBrandName = brandName.toLowerCase().trim();
      console.log(processedBrandName,"daasasda");

      this.dataStore.setData("processedBrandName", processedBrandName);
    } else {
      console.error("Brand name not found");
    }
  }
  public async retrieveProducts(): Promise<void> {
    const productNames = await this.page
      .locator(BrandLocators.PRODUCT_NAMES)
      .allTextContents();
    this.dataStore.setData("productNamesInBrands", productNames);
  }

  public async verifyAllProducts(): Promise<void> {
    const productNames = this.dataStore.getData("productNamesInBrands");
    const brandName = this.dataStore.getData("processedBrandName");
    const allIncludeBrandName = productNames.every((productName: any) =>
        productName.toLowerCase().includes(brandName)
);
    expect(allIncludeBrandName).toBeTruthy();
  }
}
