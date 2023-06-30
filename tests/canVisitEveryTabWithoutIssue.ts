import * as nightwatch from 'nightwatch';
import { appUrl } from './functionality/commonFunctionality';

export default {
    'Navigation Test': async (browser: nightwatch.NightwatchBrowser) => {
        await browser.url(appUrl);
        await browser.waitForElementVisible('body');
        await browser.click('[test-id="dataInputLink"]');
        await browser.pause(1000);
        await browser.assert.urlContains('/dataInput');
        await browser.click('[test-id="graphEditorLink"]');
        await browser.pause(1000);
        await browser.assert.urlContains('/graphEditor');
        await browser.click('[test-id="runSimulationLink"]');
        await browser.pause(1000);
        await browser.assert.urlContains('/runSimulation');
        await browser.click('[test-id="homeLink"]');
        await browser.pause(1000);
        await browser.assert.urlContains('/');
        await browser.captureBrowserExceptions((event) => {
            browser.assert.ok(false);
        });
    }
};
