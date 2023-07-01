import { NightwatchBrowser } from 'nightwatch';
import { checkForBrowserExceptions } from '../errorChecking/checkForBrowserExceptions';
import { inputDataAndSelectAllRequired } from '../csvInput/inputDataAndSelectAllRequired';
import { navigateToGraphEditor } from '../navigation/navigateToGraphEditorTab';

export default {
    beforeEach: async function (browser: NightwatchBrowser) {
        await inputDataAndSelectAllRequired(browser);
        await navigateToGraphEditor(browser);
    },

    afterEach: async function (browser: NightwatchBrowser) {
        await checkForBrowserExceptions(browser);
    },

    'Select SMA': async function (browser: NightwatchBrowser) {
        await browser.waitForElementVisible('#SMAStrategyButton', 1000);
        await browser.click('#SMAStrategyButton');
        await browser.pause(500);
    },

    'Select EMA': async function (browser: NightwatchBrowser) {
        await browser.waitForElementVisible('#EMAStrategyButton', 1000);
        await browser.click('#EMAStrategyButton');
        await browser.pause(500);
    },

    'Select MACD': async function (browser: NightwatchBrowser) {
        await browser.waitForElementVisible('#MACDStrategyButton', 1000);
        await browser.click('#MACDStrategyButton');
        await browser.pause(500);
    },

    'Select RSI': async function (browser: NightwatchBrowser) {
        await browser.waitForElementVisible('#RSIStrategyButton', 1000);
        await browser.click('#RSIStrategyButton');
        await browser.pause(500);
    }
};
