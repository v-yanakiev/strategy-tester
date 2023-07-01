import { NightwatchBrowser } from 'nightwatch';
import { checkForBrowserExceptions } from '../errorChecking/checkForBrowserExceptions';
import { inputDataAndSelectAllRequired } from '../csvInput/inputDataAndSelectAllRequired';
import * as strategySelection from '../graphEditor/selectExampleStrategies';
import { inputOtherData } from '../csvInput/inputOtherDataAndSelectAllRequired';
async function navigateToRunSimulation(browser: NightwatchBrowser) {
    await browser.pause(500);
    await browser.click('#runSimulationLink');
}

async function runSimulation(browser: NightwatchBrowser) {
    await navigateToRunSimulation(browser);
    await browser.pause(500);
    await browser.click('#startSimulationButton');
    await browser.waitForElementVisible('#graphDiv_Price', 60000);
    await browser.pause(500);
}
export default {
    afterEach: async function (browser: NightwatchBrowser) {
        await runSimulation(browser);
        await inputOtherData(browser);
        await runSimulation(browser);
        await checkForBrowserExceptions(browser);
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
