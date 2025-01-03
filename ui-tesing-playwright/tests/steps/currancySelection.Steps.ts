import {HomePage} from "../../src/homePage";
import {setDefaultTimeout} from "@cucumber/cucumber";

const { Given, When, Then} = require('@cucumber/cucumber');
setDefaultTimeout(1000 * 60);
const homePage = new HomePage();

Given('User navigates to the home page' , async function(){
    await homePage.gotoHomePage();
});

When('User selects a currency as {string} from the dropdown menu' , async function(currency : string){
    await homePage.selectCurrency(currency);
});

Then('The price of the products price should be displayed in {string}',async function(currency : string){
    await homePage.verifyCurrency(currency);
});


