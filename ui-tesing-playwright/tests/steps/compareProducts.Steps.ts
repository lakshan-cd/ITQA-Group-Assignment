import { ProductComparison } from "../../src/productComparison";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(1000 * 60 * 5);
const productComparison = new ProductComparison();
let firstProduct :string , secondProduct:string, firstProductCompare :string, secondProductCompare:string; 
Given('User is on the Product Page',  async function () {
    await productComparison.goToProductPage();
});

When('User retrieves details of the products',  async function () {
     firstProduct = await productComparison.getProductDetails(0);
     secondProduct = await productComparison.getProductDetails(1);
});

When('User add the products to the comparison list', async function () {
    await productComparison.productAddToCompare(0);
    await productComparison.productAddToCompare(1);
});

When('User navigates to the Product Comparison page', async function () {
    await productComparison.addToCompare();
});

When('User retrieves details of the products in compare model', async function () {
   firstProductCompare = await productComparison.getProductDetailsInCompare(0);
   secondProductCompare = await productComparison.getProductDetailsInCompare(1);
});

Then('Verify the products details are displayed correctly in the comparison list', async function () {
    await productComparison.verifyProductDetails(firstProduct,firstProductCompare)
});
