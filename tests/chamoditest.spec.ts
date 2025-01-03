import { test, expect, Page } from "@playwright/test";

test.describe.only("Career Opportunities Page Tests", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    test.setTimeout(300000);
    // Navigate to the Career Opportunities page
    await page.goto('https://www.singersl.com/career-opportunities');
  });

  test("Verify page title", async ({ page }: { page: Page }) => {
    // Check if the page title is correct
    await expect(page).toHaveTitle(/Vacancies - Singer/i);
  });

  test("Check job listings are visible", async ({ page }) => {
    // Verify that job listings are displayed
    const jobList = page.locator('#VacanciesDIVNew div').filter({ hasText: 'Commercial Executive IT' }).first() // Replace with actual selector
    await expect(jobList).toBeVisible();
    const jobCount = await jobList.count();
    expect(jobCount).toBeGreaterThan(0); // Ensure there are jobs listed
  });

  test('Apply for IT Operations Assistant', async ({ page }) => {
    const careerLink = page.locator('#VacanciesDIVNew div').filter({ hasText: 'Commercial Executive IT' }).nth(1)
    await expect(careerLink).toBeVisible();
    await careerLink.click();

    const jobLink = page.getByRole('link', { name: 'IT Operations Assistant' })
    await expect(jobLink).toBeVisible();
    await jobLink.click();

    const applyNowButton = page.getByRole('link', { name: 'Apply Now' })
    await expect(applyNowButton).toBeVisible();
    await applyNowButton.click();
    await page.waitForLoadState('domcontentloaded');
  });

  test('Change the Currency Mode', async ({ page }) => {
    // Locate the currency change button
  const currencyButton = page.locator('#currency-change-select')
  // Wait for the button to be visible
  await currencyButton.waitFor({ state: 'visible' });
  await expect(currencyButton).toBeVisible();
  // Ensure the button is enabled
  await expect(currencyButton).toBeEnabled();
  // Click the currency change button
  await currencyButton.click();
  // Optional: Verify the resulting state (e.g., a dropdown appears or a currency change modal opens)
  const currencyDropdown = page.locator('#currency-change-select')
  await expect(currencyDropdown).toBeVisible();
  });


  test('Clicking the Singer.lk button redirects to the Singer.lk website', async ({ page }) => {
    // Navigate to the initial page
    await page.goto('https://www.singersl.com/'); 
    const singerLink = page.getByRole('link', { name: 'SINGER Sri Lanka' })
    await expect(singerLink).toBeVisible();
    await singerLink.click();
    await page.waitForURL('https://www.singersl.com/');
    await expect(page).toHaveURL('https://www.singersl.com/');
  });


});