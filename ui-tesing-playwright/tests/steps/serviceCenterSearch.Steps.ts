import { ServiceCenterSearch } from "../../src/serviceCenterSearch";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(1000 * 60 * 5);
const serviceCenterSearch = new ServiceCenterSearch();
Given("User is on the Service Centers page", async function () {
  await serviceCenterSearch.goServiceCenterPage();
});

When("User enters a city name in the search field", async function () {
    await serviceCenterSearch.giveCityName();
});

Then(
  "Verify the displayed service center addresses include the searched city",
  async function () {
 await serviceCenterSearch.verifyCorrectProductDisplay()
  }
);
