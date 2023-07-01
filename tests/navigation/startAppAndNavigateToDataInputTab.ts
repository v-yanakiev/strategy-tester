import { NightwatchBrowser } from 'nightwatch';
import { appUrl } from '../constants';
import { navigateToDataInputTab } from './navigateToDataInputTab';

export async function startAppAndNavigateToDataInputTab(
    browser: NightwatchBrowser
) {
    await browser.url(appUrl);
    await browser.waitForElementVisible('body');
    await navigateToDataInputTab(browser);
}
