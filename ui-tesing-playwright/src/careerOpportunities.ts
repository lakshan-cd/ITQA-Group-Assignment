import { PlaywrightConfig } from "../utils/playwright.config";
import { DataStore } from "../utils/dataStore";
import { Page, BrowserContext } from "playwright";
import { CareerOpportunitiesLocators } from "../locators/careerOpportunities.locator";
const { expect } = require("@playwright/test");

export class CareerOpportunitiesPage {
    private playwrightConfig: PlaywrightConfig;
    private dataStore: DataStore;
    private page: Page = undefined as unknown as Page;
    private context: BrowserContext = undefined as unknown as BrowserContext;

    constructor() {
        this.playwrightConfig = PlaywrightConfig.getInstance();
        this.dataStore = DataStore.getInstance();
    }

    public async navigateToCareerOpportunitiesPage() {
        this.page = await this.playwrightConfig.getPage();
        await this.page.goto('https://www.singersl.com/career-opportunities');
    }

    public async verifyPageTitle() {
        await expect(this.page).toHaveTitle(/Vacancies - Singer/i);
    }

    public async checkJobListingsVisible() {
        const jobList = this.page
            .locator(CareerOpportunitiesLocators.JOB_LISTINGS)
            .filter({ hasText: 'Commercial Executive IT' })
            .first();
        await expect(jobList).toBeVisible();
        const jobCount = await jobList.count();
        expect(jobCount).toBeGreaterThan(0);
    }

    public async applyForJob() {
        const careerLink = this.page
            .locator(CareerOpportunitiesLocators.JOB_LISTINGS)
            .filter({ hasText: 'Commercial Executive IT' })
            .nth(1);
        await expect(careerLink).toBeVisible();
        await careerLink.click();

        const jobLink = this.page.getByRole('link', { name: 'IT Operations Assistant' });
        await expect(jobLink).toBeVisible();
        await jobLink.click();

        const applyNowButton = this.page.locator(CareerOpportunitiesLocators.APPLY_NOW_BUTTON);
        await expect(applyNowButton).toBeVisible();
        await applyNowButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    public async verifySingerLinkRedirect() {
        await this.page.goto('https://www.singersl.com/');
        const singerLink = this.page.locator(CareerOpportunitiesLocators.SINGER_LINK);
        await expect(singerLink).toBeVisible();
        await singerLink.click();
        await this.page.waitForURL('https://www.singersl.com/');
        await expect(this.page).toHaveURL('https://www.singersl.com/');
    }
}
