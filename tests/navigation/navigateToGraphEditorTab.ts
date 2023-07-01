import { NightwatchBrowser } from 'nightwatch';

export async function navigateToGraphEditor(browser: NightwatchBrowser) {
    await browser.click('#graphEditorLink');
    await browser.pause(2000);
}
