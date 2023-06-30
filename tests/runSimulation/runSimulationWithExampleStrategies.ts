import { NightwatchBrowser } from 'nightwatch';
import { checkForBrowserExceptions } from '../errorChecking/checkForBrowserExceptions';
import { inputDataAndSelectAllRequired } from '../csvInput/inputDataAndSelectAllRequired';
import * as strategySelection from '../graphEditor/exampleStrategiesSelect';
async function navigateToRunSimulation(browser: NightwatchBrowser) {
    await browser.pause(1000);
    await browser.click('#runSimulationLink');
}
async function visitEveryTab() {
    await browser.click('#dataInputLink');
    await browser.pause(1000);
    await browser.assert.urlContains('/dataInput');
    await browser.click('#graphEditorLink');
    await browser.pause(1000);
    await browser.assert.urlContains('/graphEditor');
    await browser.click('#runSimulationLink');
    await browser.pause(1000);
    await browser.assert.urlContains('/runSimulation');
    await browser.click('#homeLink');
    await browser.pause(1000);
    await browser.assert.urlContains('/');
    await browser.captureBrowserExceptions((event) => {
        browser.assert.ok(false);
    });
}

export default {
    afterEach: async function (browser: NightwatchBrowser) {
        await navigateToRunSimulation(browser);
        await browser.pause(1000);
        await browser.click('#startSimulationButton');
        await browser.waitForElementVisible('#graphDiv_Price', 60000);
        await browser.pause(1000);
        await visitEveryTab();
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
