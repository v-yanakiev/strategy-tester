import { appUrl } from './constants';

export async function visitEveryTab() {
    await browser.url(appUrl);
    await browser.waitForElementVisible('body');
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
