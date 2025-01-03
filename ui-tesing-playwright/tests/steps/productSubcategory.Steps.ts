import { ProductSubcategory } from "../../src/productSubcategory";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(1000 * 60 * 5);
const productSubcategory = new ProductSubcategory();
Given("User is on the product details page", async function () {
  await productSubcategory.goToProductPage();
});

When(
  "User retrieves the product price before selecting a subcategory",
  async function () {
    await productSubcategory.saveProductPrice();
  }
);

When("User switches to a different product subcategory", async function () {
  await productSubcategory.navigateNextSubCategory();
});

Then(
  "Verify the product price updates after the subcategory change",
  async function () {
    await productSubcategory.verifyProductPrice();
  }
);
