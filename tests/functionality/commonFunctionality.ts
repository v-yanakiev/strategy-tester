import { NightwatchBrowser } from 'nightwatch';
export const appUrl = 'http://localhost:4000/';
export async function navigateToDataInputTab(browser: NightwatchBrowser) {
    await browser.url(appUrl);
    await browser.waitForElementVisible('body');
    await browser.click('[test-id="dataInputLink"]');
    await browser.pause(1000);
}
export async function checkForBrowserExceptions(browser: NightwatchBrowser) {
    await browser.captureBrowserExceptions((event) => {
        browser.assert.ok(false);
    });
}
export async function loadFile(filePath: any) {}
