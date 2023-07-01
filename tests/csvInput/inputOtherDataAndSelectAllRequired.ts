import { NightwatchBrowser } from 'nightwatch';
import { navigateToDataInputTab } from '../navigation/navigateToDataInputTab';
import { AAPLEarlyDataFilePath } from '../constants';
import { checkForBrowserExceptions } from '../errorChecking/checkForBrowserExceptions';

export async function inputOtherData(browser: NightwatchBrowser) {
    await navigateToDataInputTab(browser);
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
