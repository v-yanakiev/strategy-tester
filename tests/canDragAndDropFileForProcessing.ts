import * as nightwatch from 'nightwatch';
import {
    checkForBrowserExceptions,
    navigateToDataInputTab
} from './functionality/commonFunctionality';
const path = require('path');
const filePath = path.resolve(__dirname, '../data/AAPLShortened.csv');
export default {
    'Test drag-and-drop file input': async (
        browser: nightwatch.NightwatchBrowser
    ) => {
        await navigateToDataInputTab(browser);
        await browser.execute(function () {
            (document!.querySelector(
                '#fileInput'
            ) as HTMLElement)!.style!.display = 'block';
        });
        await browser.setValue('#fileInput', filePath);
        await browser.execute(function () {
            (document!.querySelector(
                '#fileInput'
            ) as HTMLElement)!.style!.display = 'none';
        });
        await checkForBrowserExceptions(browser);
    }
};
