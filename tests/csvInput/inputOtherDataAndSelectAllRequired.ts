import { NightwatchBrowser } from 'nightwatch';
import { checkForBrowserExceptions } from '../errorChecking/checkForBrowserExceptions';
const path = require('path');

const AAPLEarlyDataFilePath = path.resolve(
    __dirname,
    '../../data/AAPLEarlyData.csv'
);

export async function inputOtherData(browser: NightwatchBrowser) {
    await browser.click('#dataInputLink');
    await browser.pause(200);
    await browser.execute(function () {
        (document!.querySelector('#fileInput') as HTMLElement)!.style!.display =
            'block';
    });
    await browser.setValue('#fileInput', AAPLEarlyDataFilePath);
    await browser.execute(function () {
        (document!.querySelector('#fileInput') as HTMLElement)!.style!.display =
            'none';
    });
    await checkForBrowserExceptions(browser);
    await browser.waitForElementVisible('#initialBalanceInput', 10000);
    await browser.setValue('#initialBalanceInput', '10000');
    await browser.click('#initialBalanceConfirmation');
    await browser.pause(500);
    // Test time variable selection
    await browser.click(`#possibleTimeVariables input[value="Date"]`);
    await browser.pause(500);
    // Test price variable selection
    await browser.click(`#possiblePriceVariables input[value="Open"]`);
    await browser.pause(500);
}
