import { PlaywrightConfig } from "../utils/playwright.config";
import { Page, BrowserContext } from "playwright";
import { DataStore } from "../utils/dataStore";
import { expect } from "@playwright/test";
import { ServiceCenterSearchLocators } from "../locators/serviceCenterSearch.locator";

export class ServiceCenterSearch {
  private playWrightConfig: PlaywrightConfig;
  private dataStore: DataStore;
  private page: Page = undefined as unknown as Page;

  constructor() {
    this.playWrightConfig = PlaywrightConfig.getInstance();
    this.dataStore = DataStore.getInstance();
  }

  public async goServiceCenterPage(): Promise<any> {
    this.page = await this.playWrightConfig.getPage();
    await this.page.goto("https://www.singersl.com/service-centres");
    await this.page.waitForTimeout(2000);
  }

  public async giveCityName(): Promise<any> {
    const city = "Aluthgama";
    this.dataStore.setData("city", city);
    await this.page.locator(ServiceCenterSearchLocators.ADDRESS).fill(city);
    await this.page.locator(ServiceCenterSearchLocators.SEARCH_ADDRESS).click();
  }

  public async verifyCorrectProductDisplay(): Promise<any> {
    const resultAddresses = await this.page
      .locator(ServiceCenterSearchLocators.RESULT_ADDRESSES)
      .allTextContents();
    const city = this.dataStore.getData("city");
    const allAddressesContainCity = resultAddresses.every((address) =>
      address.toLowerCase().includes(city.toLowerCase())
    );
    expect(allAddressesContainCity).toBe(true);
  }
}
