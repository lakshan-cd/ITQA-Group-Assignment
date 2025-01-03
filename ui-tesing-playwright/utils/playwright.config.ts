import { Browser, BrowserContext, firefox, Page } from "playwright";

export class PlaywrightConfig {
  private static instance: PlaywrightConfig;
  private browser: Browser | null = null;
  private defaultContext: BrowserContext | null = null;
  private page: Page | null = null;
  private baseUrl: string = "https://www.singersl.com";
  private constructor() {}


  public static getInstance(): PlaywrightConfig {
    if (!PlaywrightConfig.instance) {
      PlaywrightConfig.instance = new PlaywrightConfig();
    }
    return PlaywrightConfig.instance;
  }

  public async getPage(): Promise<Page> {
    if (!this.browser) {
      const isHeadless = process.env.HEADLESS === "true";
      console.log("Launching browser in headless mode:", isHeadless);
      this.browser = await firefox.launch({ headless: isHeadless });
    }

    if (!this.defaultContext) {
      this.defaultContext = await this.browser.newContext();
    }

    if (!this.page) {
      this.page = await this.defaultContext.newPage();
      this.page.setDefaultTimeout(1000 * 60);
      this.page.setDefaultNavigationTimeout(1000 * 60);
    }

    return this.page;
  }

  // Method to return a new BrowserContext each time
  public async getContext(): Promise<BrowserContext> {
    if (!this.browser) {
      const isHeadless = false;
      console.log("Launching browser in headless mode:", isHeadless);
      this.browser = await firefox.launch({ headless: isHeadless });
    }
    return await this.browser.newContext();
  }

  public async closePage(): Promise<void> {
    if (this.page) {
      await this.page.close();
      this.page = null;
    }

    if (this.defaultContext) {
      await this.defaultContext.close();
      this.defaultContext = null;
    }

    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  public getBaseUrl() {
    return this.baseUrl;
  }
}
