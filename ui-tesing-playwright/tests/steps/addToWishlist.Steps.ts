import { AddToWishList } from "../../src/wishlist";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(1000 * 60 * 5);
const wishList = new AddToWishList();
Given("User is logged in with valid session cookies", async function () {
  await wishList.openContextWithAuthentication();
});

When("User adds a product to the wishlist", async function () {
  await wishList.addToWhishListAndGetProductName();
  await wishList.navigateToMyAccount();
});

When("User navigates to the Wishlist page", async function () {
  await wishList.navigateToWishlistProducts();
});

Then("Verify the product is displayed in the Wishlist", async function () {
  await wishList.getWishlistProduct();
  await wishList.verifyCorrectProduct();
});
