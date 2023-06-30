import { NightwatchBrowser } from 'nightwatch';
import { checkForBrowserExceptions } from '../errorChecking/checkForBrowserExceptions';
import { inputDataAndSelectAllRequired } from '../csvInput/inputDataAndSelectAllRequired';

async function navigateToRunSimulation(browser: NightwatchBrowser) {
    await browser.click('#graphEditorLink');
    await browser.pause(2000);
}

export default {
    before: async function (browser: NightwatchBrowser) {
        await inputDataAndSelectAllRequired(browser);
        await navigateToRunSimulation(browser);
    },

    after: function (browser: NightwatchBrowser) {
        checkForBrowserExceptions(browser);
    },

    'Run SMA': async function (browser: NightwatchBrowser) {
        await browser.waitForElementVisible('#SMAStrategyButton', 1000);
        await browser.click('#SMAStrategyButton');
        await browser.pause(1000);
    },

    'Run EMA': async function (browser: NightwatchBrowser) {
        await browser.waitForElementVisible('#EMAStrategyButton', 1000);
        await browser.click('#EMAStrategyButton');
        await browser.pause(1000);
    },

    'Run MACD': async function (browser: NightwatchBrowser) {
        await browser.waitForElementVisible('#MACDStrategyButton', 1000);
        await browser.click('#MACDStrategyButton');
        await browser.pause(1000);
    },

    'Run RSI': async function (browser: NightwatchBrowser) {
        await browser.waitForElementVisible('#RSIStrategyButton', 1000);
        await browser.click('#RSIStrategyButton');
        await browser.pause(1000);
    }
};
