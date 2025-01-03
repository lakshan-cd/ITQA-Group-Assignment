import { ExcludeStockOut } from "../../src/excludeStockOut";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(1000 * 60 * 5);
const excludeStockOut = new ExcludeStockOut();
Given("User is on the brand's product listing page", async function () {
  await excludeStockOut.goToProductPage();
});

When("User clicks the Exclude Stock Out button", async function () {
    await excludeStockOut.clickExcludeStockOut();
});

Then(
  "Verify that no Sold Out products are displayed on the page",
  async function () {
      await excludeStockOut.verifySoldOutProduct();
  }
);
