import { NightwatchBrowser } from 'nightwatch';
import { navigateToDataInputTab } from '../navigation/navigateToDataInputTab';
import { checkForBrowserExceptions } from '../errorChecking/checkForBrowserExceptions';
import { AAPLShortenedFilePath } from '../constants';

export async function inputAAPLShortened(browser: NightwatchBrowser) {
    await navigateToDataInputTab(browser);
    await browser.execute(function () {
        (document!.querySelector('#fileInput') as HTMLElement)!.style!.display =
            'block';
    });
    await browser.setValue('#fileInput', AAPLShortenedFilePath);
    await browser.execute(function () {
        (document!.querySelector('#fileInput') as HTMLElement)!.style!.display =
            'none';
    });
    await checkForBrowserExceptions(browser);
    await browser.pause(1000);
}
