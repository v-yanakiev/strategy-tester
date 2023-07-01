import { NightwatchBrowser } from 'nightwatch';
import { appUrl } from '../constants';

export async function startAppAndNavigateToDataInputTab(
    browser: NightwatchBrowser
) {
    await browser.url(appUrl);
    await browser.waitForElementVisible('body');
    await browser.click('#dataInputLink');
    await browser.pause(200);
}
