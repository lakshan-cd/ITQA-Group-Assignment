const { test, expect } = require('@playwright/test');

test.describe('Career Opportunities Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the Career Opportunities page
        await page.goto('https://www.singersl.com/career-opportunities');
    });

    test('Verify page title', async ({ page }) => {
        // Check if the page title is correct
        await expect(page).toHaveTitle(/Career Opportunities/i);
    });

    test('Check job listings are visible', async ({ page }) => {
        // Verify that job listings are displayed
        const jobList = await page.locator('.job-listing-class'); // Replace with the actual selector
        await expect(jobList).toBeVisible();
        const jobCount = await jobList.count();
        expect(jobCount).toBeGreaterThan(0); // Ensure there are jobs listed
    });

    test('Test Apply Now button functionality', async ({ page }) => {
        // Click the Apply Now button on the first job listing
        await page.click('.apply-now-button-class'); // Replace with actual selector
        await expect(page).toHaveURL(/apply/); // Verify redirection to the application page
    });

    test('Validate search/filter functionality', async ({ page }) => {
        // Use the search bar to filter jobs
        const searchInput = page.locator('#search-bar-id'); // Replace with actual selector
        await searchInput.fill('Manager');
        await page.keyboard.press('Enter');
        const filteredResults = await page.locator('.job-listing-class'); // Replace with actual selector
        await expect(filteredResults).toContainText('Manager');
    });
});
