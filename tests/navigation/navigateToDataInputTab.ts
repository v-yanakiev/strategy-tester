import { NightwatchBrowser } from 'nightwatch';
import { appUrl } from '../constants';

export async function navigateToDataInputTab(browser: NightwatchBrowser) {
    await browser.click('#dataInputLink');
    await browser.pause(200);
}
