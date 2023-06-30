import { NightwatchBrowser } from 'nightwatch';
import { appUrl } from '../constants';

export async function navigateToDataInputTab(browser: NightwatchBrowser) {
    await browser.url(appUrl);
    await browser.waitForElementVisible('body');
    await browser.click('#dataInputLink');
    await browser.pause(1000);
}
