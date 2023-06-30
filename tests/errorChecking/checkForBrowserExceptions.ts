import { NightwatchBrowser } from 'nightwatch';

export async function checkForBrowserExceptions(browser: NightwatchBrowser) {
    await browser.captureBrowserExceptions((event) => {
        browser.assert.ok(false);
    });
}
