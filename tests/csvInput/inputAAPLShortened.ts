import { NightwatchBrowser } from 'nightwatch';
import { startAppAndNavigateToDataInputTab } from '../navigation/startAppAndNavigateToDataInputTab';
import { checkForBrowserExceptions } from '../errorChecking/checkForBrowserExceptions';
const path = require('path');

const AAPLShortenedFilePath = path.resolve(
    __dirname,
    '../../data/AAPLShortened.csv'
);

export async function inputAAPLShortened(browser: NightwatchBrowser) {
    await startAppAndNavigateToDataInputTab(browser);
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
    await browser.pause(500);
}
