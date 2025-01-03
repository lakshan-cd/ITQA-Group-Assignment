import { BrandFilter } from "../../src/brandFilter";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(1000 * 60 * 5);
const brandFilter = new BrandFilter();
Given("User is on the Brands Page", async function () {
  await brandFilter.goToBrandsPage();
});

When(
  "User clicks on a specific brand and navigates to the brands product listing page",
  async function () {
    await brandFilter.goToSpecificBrandPage();
  }
);

When("User retrieves the brand name", async function () {
  await brandFilter.retrievesBrandName();
});

When(
  "User retrieves the names of all products listed on the page",
  async function () {
    await brandFilter.retrieveProducts();
  }
);

Then(
  "Verify all products displayed belong to the selected brand",
  async function () {
    await brandFilter.verifyAllProducts();
  }
);
