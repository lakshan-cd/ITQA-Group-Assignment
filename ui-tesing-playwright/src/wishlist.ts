import { PlaywrightConfig } from "../utils/playwright.config";
import { Page, BrowserContext } from "playwright";
import { DataStore } from "../utils/dataStore";
import { expect } from "@playwright/test";
import { ProductLocators } from "../locators/product.locator";
import { WishlistLocators } from "../locators/wishlist.locator";
import * as dotenv from "dotenv";
dotenv.config();
export class AddToWishList {
  private playWrightConfig: PlaywrightConfig;
  private dataStore: DataStore;
  private page: Page = undefined as unknown as Page;
  private context: BrowserContext = undefined as unknown as BrowserContext;
  private wishlistProductName: any;

  constructor() {
    this.playWrightConfig = PlaywrightConfig.getInstance();
    this.dataStore = DataStore.getInstance();
  }
  public async openContextWithAuthentication(): Promise<any> {
    this.context = await this.playWrightConfig.getContext();
    await this.context.addCookies([
      {
        name: "singer_session",
        value:
          process.env.SINGER_SESSION ||
          "eyJpdiI6IldNNEpieWhGeTcrRkNQV2ppbml2U2c9PSIsInZhbHVlIjoiN2FWV3NkMGUydXhHYzgxSjZOUU96RTFnUEYvaTU3aVlRVGFOc3ozK1VTMUhOZkZlbWhnZzF4UmpZZmxwUlZGbGoxdUZRZ3Q4WjgybnF3azdKa2d0bUd5dWJXTWMxd0RXcFpSWkFaRXNPS09LcElYbG1Kc21kWDhUZWtlejl1QmgiLCJtYWMiOiIyYjQyOWIyNTc2OTAwOTQ0NWQ1Y2JjODI4MWI2YTcwYzhhMDc1NmIxZmYxYmMyZjM2YjY5ODY4NjMxYjRlNTMxIiwidGFnIjoiIn0%3D",
        domain: "www.singersl.com",
        path: "/",
      },
    ]);
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(1000 * 60);
    this.page.setDefaultNavigationTimeout(1000 * 60);
    await this.page.goto("https://www.singersl.com/products");
    await this.page.waitForTimeout(2000);
  }

  public async addToWhishListAndGetProductName(): Promise<string | null> {
    await this.page
      .locator(ProductLocators.ADD_TO_WISHLIST_ICON)
      .nth(3)
      .click();

    const productNameAddedToWishlist = await this.page
      .locator(ProductLocators.PRODUCT_NAME_LOCATOR)
      .nth(3)
      .textContent();
    this.dataStore.setData(
      "productNameAddedToWishlist",
      productNameAddedToWishlist
    );
    return productNameAddedToWishlist;
  }
  public async navigateToMyAccount(): Promise<void> {
    await this.page.locator(ProductLocators.MY_ACCOUNT_BUTTON).click();
  }

  public async navigateToWishlistProducts(): Promise<void> {
    this.page.locator(WishlistLocators.MY_WISHLIST_BUTTON).click();
  }

  public async getWishlistProduct(): Promise<void> {
    this.wishlistProductName = await this.page
      .locator(WishlistLocators.PRODUCT_NAME)
      .textContent();
  }
  public async verifyCorrectProduct() {
    const productName = this.dataStore.getData("productNameAddedToWishlist");

    expect(this.wishlistProductName.trim().toLowerCase()).toBe(
      productName.trim().toLowerCase()
    );
    await this.page
      .locator(WishlistLocators.REMOVE_FROM_WISHLIST_BUTTON)
      .click();
  }
}
