import { NightwatchBrowser } from 'nightwatch';
import { checkForBrowserExceptions } from '../errorChecking/checkForBrowserExceptions';
import * as strategySelection from '../graphEditor/selectExampleStrategies';
import { createCustomStrategy } from '../graphEditor/createCustomStrategy';
async function navigateToRunSimulation(browser: NightwatchBrowser) {
    await browser.pause(500);
    await browser.click('#runSimulationLink');
}
const path = require('path');

const AAPLEarlyDataFilePath = path.resolve(
    __dirname,
    '../../data/AAPLEarlyData.csv'
);

async function inputOtherData(browser: NightwatchBrowser) {
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

async function runSimulation(browser: NightwatchBrowser) {
    await navigateToRunSimulation(browser);
    await browser.pause(500);
    await browser.click('#startSimulationButton');
    await browser.waitForElementVisible('#graphDiv_Price', 60000);
    await browser.pause(1000);
}
export default {
    afterEach: async function (browser: NightwatchBrowser) {
        await runSimulation(browser);
        await inputOtherData(browser);
        await runSimulation(browser);
        await checkForBrowserExceptions(browser);
    },

    'Run Custom Strategy': async function (browser: NightwatchBrowser) {
        await createCustomStrategy(browser);
    },
    'Run SMA': async function (browser: NightwatchBrowser) {
        await strategySelection.default.beforeEach(browser);
        await strategySelection.default['Select SMA'](browser);
    },

    'Run EMA': async function (browser: NightwatchBrowser) {
        await strategySelection.default.beforeEach(browser);
        await strategySelection.default['Select EMA'](browser);
    },

    'Run MACD': async function (browser: NightwatchBrowser) {
        await strategySelection.default.beforeEach(browser);
        await strategySelection.default['Select MACD'](browser);
    },

    'Run RSI': async function (browser: NightwatchBrowser) {
        await strategySelection.default.beforeEach(browser);
        await strategySelection.default['Select RSI'](browser);
    }
};
