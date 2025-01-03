import {After, AfterAll, BeforeAll} from "@cucumber/cucumber";
import {PlaywrightConfig} from "../utils/playwright.config";

const playwrightConfig:PlaywrightConfig = PlaywrightConfig.getInstance();

BeforeAll(async function () {

    console.log('* * * * * * * * * * * *');
});
AfterAll(async function () {
    await playwrightConfig.closePage();
});

After(async function ({pickle}) {
    const page = await playwrightConfig.getPage();
    const img = await page.screenshot({path: `./reports/screenshots/${pickle.name}.png`, type: 'png'});
    this.attach(img, 'image/png');
    console.log("\n* * * * * * * * * * * *\n");
});