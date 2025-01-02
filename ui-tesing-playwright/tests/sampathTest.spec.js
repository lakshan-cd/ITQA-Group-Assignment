const { test, expect } = require('@playwright/test');
const { POManager } = require("../pageobjects/POManager")
require('dotenv').config();




test('@web @productFilter Validate product filtering by price range', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    const productPage = poManager.getProductPage();
    await productPage.goTo();
    await productPage.fillMinMax("-vzx2000", -300000);
    const productList = await productPage.getProductPrices();
    if (productList.length === 0) {
        await productPage.verifyNoProducts();
    } else {
        await productPage.verifyProducts();
    }

})

test('@web @sample Verify Product Added to Wishlist is Displayed in the Wishlist Pagef', async ({ browser }) => {

    const context = await browser.newContext();
    await context.addCookies([
        {
            name: 'singer_session',
            value: process.env.SINGER_SESSION,
            domain: 'www.singersl.com',
            path: '/',
        },
    ]);
    const page = await context.newPage();
    const poManager = new POManager(page);
    const productPage = poManager.getProductPage();
    await productPage.goTo();
    const productName = await productPage.addToWhishListAndGetProductName();
    await productPage.navigateToMyAccount();
    const wishlistPage = poManager.getWishListPage();
    await wishlistPage.navigateToWishlistProducts();
    await wishlistPage.getWishlistProduct();
    await wishlistPage.verifyCorrectProduct(productName);
})

test('@web @sample Verify Filtering by Discount Displays Correct Products s', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const poManager = new POManager(page);
    const productPage = poManager.getProductPage();
    await productPage.goToElectronicsProducts();
    const buttonShouldBeClick = "Less than 10%";
    await page.locator(`.facets-widget-singer_offer_checkbox .facet-item label:has-text("${buttonShouldBeClick}")`).click();
    const productOfferList = await page.locator(".product-item .offer-percentage").allTextContents();
    const numericOfferList = productOfferList.map(offer => parseFloat(offer.match(/[\d.]+/)[0]));

    switch (buttonShouldBeClick) {
        case "Less than 10%":
            expect(numericOfferList.every(offer => offer < 10)).toBeTruthy();
            break;
        case "10% or More":
            expect(numericOfferList.every(offer => offer >= 10)).toBeTruthy();
            break;
        case "12% or More":
            expect(numericOfferList.every(offer => offer >= 12)).toBeTruthy();
            break;
        case "15% or More":
            expect(numericOfferList.every(offer => offer >= 15)).toBeTruthy();
            break;
        case "20% or More":
            expect(numericOfferList.every(offer => offer >= 20)).toBeTruthy();
            break;
        case "30% or More":
            expect(numericOfferList.every(offer => offer >= 30)).toBeTruthy();
            break;
        case "50% or More":
            expect(numericOfferList.every(offer => offer >= 50)).toBeTruthy();
            break;

    }

})
test.only('@web @sample Verify Comparison Functionality Displays Correct Product Details', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.singersl.com/products");

    const getProductDetails = async (index) => {
        const name = await page.locator(".product-listing-content .product-item h2").nth(index).textContent();
        const code = await page.locator(".product-listing-content .product-item .sku").nth(index).textContent();
        const price = await page.locator(".product-listing-content .product-item .selling-price").nth(index).textContent();
        return { name: name.trim(), code: code.trim(), price: price.replace("RS", "").trim() };
    };
    const getProductDetailsInCompare = async (index) => {
        const name = await page.locator("span h2").nth(index).textContent();
        const code = await page.locator("span .sku").nth(index).textContent();
        const price = await page.locator("span .selling-price").nth(index).textContent();
        return { name: name.trim(), code: code.trim(), price: price.replace("RS", "").trim() };
    };
    const addToCompare = async function (index) {
        await page.locator(".product-item").nth(index).hover().then(async function () {
            await page.locator(".all_compare_checkbox").nth(index).check();
        })
        await page.locator("#comparediv img").nth(index).waitFor({ state: 'visible' });
    }

    const firstProduct = await getProductDetails(0);
    const secondProduct = await getProductDetails(1);
    await addToCompare(0);
    await addToCompare(1);

    await page.locator("#compare-button").click();

    const firstProductInCompare = await getProductDetailsInCompare(0);
    const secondProductInCompare = await getProductDetailsInCompare(1);

    expect(firstProductInCompare).toEqual(firstProduct);
    expect(secondProductInCompare).toEqual(secondProduct);

})


// test('@web @sample Verify Product Added to Wishlist is Displayed in the Wishlist Page', async ({ browser }) => {

//     const context = await browser.newContext();
//     await context.addCookies([
//         {
//             name: 'singer_session',
//             value: 'eyJpdiI6IlNqbzZYVEZTZE1uVW1TQmk4eXA3WEE9PSIsInZhbHVlIjoic3hUZXM0M1BRRHRaQlJZdnlYM3prTThuL2dGNGdKbGRJb20xejF3ekt5bkFGOFFGY1pWN0V5S3lOK1Q4bzBtdksyL1d4a2J5Q0xxTDIxY1dISXJ5b1BhVlhKdWk3cGdpVXI2VUhkODJ1YSs0dHNVWjRnaFRaOHhUdmlHNURDamkiLCJtYWMiOiI1M2M3NjBlMmYyOWZkMTVkY2Y3OTlhMmY3NGI5ZmViZjBhOWI4M2ZlOTQ3Y2ZjZTJmNzcyNDEyNzZlMWUwOWIwIiwidGFnIjoiIn0%3D',
//             domain: 'www.singersl.com',
//             path: '/',
//         },
//     ]);
//     const page = await context.newPage();
//     await page.goto("https://www.singersl.com/products");
//     const productName = await page.locator(" .product-item h2").nth(3).textContent();
//     await page.locator(".product-item .icon-wishlist").nth(3).click();
//     await page.locator("a:has-text('My Account')").click();
//     await page.locator(".my-wishlist").click();
//     const wishlistProductName = await page.locator(".wishlist-item h3").textContent();
//     expect(wishlistProductName.trim().toLowerCase()).toBe(productName.trim().toLowerCase());
//     await page.locator(".wishlist-item #edit-items-11755-actions-remove").click();

// })


// test('@web @sample test sdssss ', async ({ browser }) => {

//     const context = await browser.newContext();
//     const page = await context.newPage();
//     //goto
//     await page.goto("https://www.singersl.com/products");
//     //fill the min max values
//     const min = "-111";
//     const max = "111111"
//     await page.locator("#amount-min").click();
//     await page.locator("#amount-min").press("Control+A");
//     await page.locator("#amount-min").press("Backspace");
//     await page.locator("#amount-min").type(min);
//     await page.locator(".filters .fitler-header").click();
//     await page.locator("#amount-max").type(max);
//     await page.locator(".filters .fitler-header").click();
//     const minValue = parseFloat(min);
//     if (minValue < 0) {
//         // Check for an error message or an invalid result
//         await expect(page.locator(".no-results")).toBeVisible();
//     }
//     //getting the product prices
//     const sellingPrices = await page.locator(".selling-price", { hasText: /^RS/i }).allTextContents();
//     const validSellingPrices = sellingPrices.filter(price => price.trim() !== '' && price.trim() !== '0');
//     const cleanedSellingPrices = validSellingPrices.map(price =>
//         parseFloat(price.replace(/(RS|Rs\.|,)/g, '').trim())
//     );
//     // await page.pause();
//     console.log(cleanedSellingPrices);
//     //verify the product prices
//     cleanedSellingPrices.forEach(price => {
//         expect(price).toBeGreaterThanOrEqual(0);
//         expect(price).toBeLessThanOrEqual(44400000);
//     });
// })




// test.only('@web @sample test1 After selecting a subcategory in the homepage categories, it should navigate to the relevant category and correctly filter the relevant subcategory.', async ({ browser }) => {

//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto("https://www.hitad.lk/");
//     const product = page.locator(".single-ads-product").nth(3);
//     const categoryName = await product.locator(".title").textContent();
//     const subCategoryName = await product.locator(".n-text").nth(1).textContent();
//     await page.locator(".single-ads-product").nth(3).locator(".n-text").nth(1).click();
//     await expect(page.locator(".breadcrumb a").nth(1)).toHaveText(categoryName);
//     await expect(page.locator(".breadcrumb a").nth(2)).toHaveText(new RegExp(`${subCategoryName}?`, "i"));
//     await expect(page.locator("#pet_categories option[selected]")).toHaveText(new RegExp(`${subCategoryName}?`, 'i'));

// });

/*

test('@web @sample test ', async ({ browser }) => {

    const context = await browser.newContext();
    await context.addCookies([
        {
            name: 'popup_promotion_seen',
            value: 'yes',
            domain: 'www.cameralk.com',
            path: '/',
        },
    ]);

    const page = await context.newPage();
    await page.goto("https://www.cameralk.com/");
    await page.locator("#myAccountDropdown").click();
    await page.locator("[data-target='#loginModal']").first().click();
    await page.locator("#login_email").fill("nalakasampathsmp@gmail.com");
    await page.locator("#login_password").fill("Sampa@12");
    await page.locator("#remember").click();
    await page.locator(".modal-content button").nth(3).click();
    const signInElement = page.locator('#myAccountDropdown  small');
    const textContent = await signInElement.textContent();
    console.log(`Extracted text: "${textContent}"`);
    await expect(signInElement).not.toHaveText('Sign in / Join Free');
})

test('@web  login test', async ({ browser }) => {
    const context = await browser.newContext();
    await context.addCookies([
        {
            name: 'popup_promotion_seen',
            value: 'yes',
            domain: 'www.cameralk.com',
            path: '/',
        },
    ]);

    const page = await context.newPage();
    const poManager = new POManager(page);

    const loggingPage = poManager.getLoginPage();
    await loggingPage.goTo();
    await loggingPage.goToLoggingModal();
    await loggingPage.submitLogin("nalakasampathsmp@gmail.com", "Sampa@12");
    await loggingPage.checkingNewUser();
});


*/