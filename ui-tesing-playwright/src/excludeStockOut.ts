import { PlaywrightConfig } from "../utils/playwright.config";
import { Page } from "playwright";
import { DataStore } from "../utils/dataStore";
import { expect } from "@playwright/test";
import { ExcludeStockOutLocator } from "../locators/excludeStockOut.locator";

export class ExcludeStockOut {
  private playWrightConfig: PlaywrightConfig;
  private dataStore: DataStore;
  private page: Page = undefined as unknown as Page;
  constructor() {
    this.playWrightConfig = PlaywrightConfig.getInstance();
    this.dataStore = DataStore.getInstance();
  }

  public async goToProductPage(): Promise<any> {
    this.page = await this.playWrightConfig.getPage();
    await this.page.goto("https://www.singersl.com/brands/asus");
    await this.page.waitForTimeout(2000);
  }

  public async clickExcludeStockOut(): Promise<any> {
    await this.page
      .locator(ExcludeStockOutLocator.EXCLUDE_STOCK_OUT_BUTTON)
      .click();
  }

  public async verifySoldOutProduct(): Promise<any> {
   const soldOutProducts = await this.page.locator(ExcludeStockOutLocator.SOLD_OUT_BUTTON).count();
   expect(soldOutProducts).toBe(0);
  }
}
