import * as nightwatch from 'nightwatch';
import { inputAAPLShortened } from './inputAAPLShortened';

export async function selectAllAfterDropping(
    browser: nightwatch.NightwatchBrowser
) {
    inputAAPLShortened(browser);
    await browser.waitForElementVisible('#initialBalanceInput', 10000);
    await browser.setValue('#initialBalanceInput', '10000');
    await browser.click('#initialBalanceConfirmation');
    await browser.pause(1000);
    // Test time variable selection
    await browser.click(`#possibleTimeVariables input[value="Date"]`);
    await browser.pause(500);
    // Test price variable selection
    await browser.click(`#possiblePriceVariables input[value="Open"]`);
    await browser.pause(500);
    await browser.end();
}
