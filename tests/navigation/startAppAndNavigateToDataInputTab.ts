import { NightwatchBrowser } from 'nightwatch';
const appUrl = 'http://localhost:4000/';
export async function startAppAndNavigateToDataInputTab(
    browser: NightwatchBrowser
) {
    await browser.url(appUrl);
    await browser.waitForElementVisible('body');
    await browser.click('#dataInputLink');
    await browser.pause(200);
}
