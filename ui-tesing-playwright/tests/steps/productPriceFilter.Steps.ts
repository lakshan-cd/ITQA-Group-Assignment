import { ProductFilter } from "../../src/productFilter";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(1000 * 60 * 5);
const productFilter = new ProductFilter();
Given("User navigates to the Product Listing Page", async function () {
  await productFilter.goToProductPage();
});

When(
  "User sets the minimum price as {string} and maximum price as {string}",
  async function (min, max) {
    await productFilter.fillMinMax(min, max);
  }
);

When("Get the product price list", async function () {
  this.productList = await productFilter.getProductPrices();
});

Then(
  "If no products are found, verify the No Products Found message is displayed",
  async function () {
    if (this.productList.length === 0) {
      await productFilter.verifyNoProducts();
    }
  }
);

Then(
  "If products are found, verify all displayed products fall within the selected price range",
  async function () {
    if (this.productList.length > 0) {
      await productFilter.verifyProducts();
    }
  }
);
