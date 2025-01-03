import { CareerOpportunitiesPage } from "../../src/careerOpportunities";
import { setDefaultTimeout } from "@cucumber/cucumber";

const { Given, When, Then } = require('@cucumber/cucumber');
setDefaultTimeout(300000);
const careerPage = new CareerOpportunitiesPage();

Given('User navigates to the Career Opportunities page', async function () {
    await careerPage.navigateToCareerOpportunitiesPage();
});

Then('The Career Opportunities page title should be correct', async function () {
    await careerPage.verifyPageTitle();
});

When('Job listings are visible', async function () {
    await careerPage.checkJobListingsVisible();
});

When('User applies for the IT Operations Assistant job', async function () {
    await careerPage.applyForJob();
});

Then('Clicking the Singer.lk button redirects to the Singer.lk website', async function () {
    await careerPage.verifySingerLinkRedirect();
});
