import { NightwatchBrowser } from 'nightwatch';
import { inputDataAndSelectAllRequired } from '../csvInput/inputDataAndSelectAllRequired';
let elementCount = 1;
export async function createExampleStrategy(browser: NightwatchBrowser) {
    await inputDataAndSelectAllRequired(browser);
    await browser.click('#graphEditorLink');
    await browser.pause(500);
    await clickStartNode(browser);

    await clickAddIfBlock(browser);
    await inputIfCondition(browser);
    const ifBlockId = await finalizeIfCondition(browser);
    clickAddBuyButton(browser);
    inputBuyCondition(browser);
    const buyBlockId = await finalizeBuyAction(browser);
    clickAddSellButton(browser);
    inputSellCondition(browser);
    const sellBlockId = await finalizeSellAction(browser);
    await clickStartNode(browser);
    await clickStartNormalPathButton(browser);
    await clickNodeWithCertainId(browser, ifBlockId);
    await clickEndNormalPathButton(browser);
    await clickNodeWithCertainId(browser, ifBlockId);
    await clickStartTruePathButton(browser);
    await clickNodeWithCertainId(browser, sellBlockId);
    await clickEndTruePathButton(browser);
    await clickNodeWithCertainId(browser, ifBlockId);
    await clickStartFalsePathButton(browser);
    await clickNodeWithCertainId(browser, buyBlockId);
    await clickEndFalsePathButton(browser);
    await clickNodeWithCertainId(browser, sellBlockId);
    await clickStartNormalPathButton(browser);
    await clickEndNode(browser);
    await clickEndNormalPathButton(browser);
    await clickNodeWithCertainId(browser, buyBlockId);
    await clickStartNormalPathButton(browser);
    await clickEndNode(browser);
    await clickEndNormalPathButton(browser);
    await browser.pause(2000000);
}
async function clickAddIfBlock(browser: NightwatchBrowser) {
    await browser.click('#addIfBlockButton');
    await browser.pause(500);
}
async function inputIfCondition(browser: NightwatchBrowser) {
    await browser.setValue(
        '#ifStatementInput',
        'mathjs.mean(previousSteps, slice(previousSteps.length-20, undefined).map(a=> a.Open)) < currentStep.Open'
    );
    await browser.pause(500);
}
async function finalizeIfCondition(browser: NightwatchBrowser) {
    await browser.click('#finalizeIfStatementButton');
    await browser.pause(500);
    return ++elementCount;
}
async function clickAddBuyButton(browser: NightwatchBrowser) {
    await browser.click('#buyAddButton');
    await browser.pause(500);
}
async function inputBuyCondition(browser: NightwatchBrowser) {
    await browser.setValue('#buyActionInput', '10');
    await browser.pause(500);
}
async function finalizeBuyAction(browser: NightwatchBrowser) {
    await browser.click('#buyFinalizeButton');
    await browser.pause(500);
    return ++elementCount;
}
async function clickAddSellButton(browser: NightwatchBrowser) {
    await browser.click('#sellAddButton');
    await browser.pause(500);
}
async function inputSellCondition(browser: NightwatchBrowser) {
    await browser.setValue('#sellActionInput', '10');
    await browser.pause(500);
}
async function finalizeSellAction(browser: NightwatchBrowser) {
    await browser.click('#sellFinalizeButton');
    await browser.pause(500);
    return ++elementCount;
}
async function clickStartNode(browser: NightwatchBrowser) {
    await clickMxGraphElement(browser, 'graphElement_startNode');
    await browser.pause(500);
}
async function clickEndNode(browser: NightwatchBrowser) {
    await clickMxGraphElement(browser, 'graphElement_endNode');
    await browser.pause(500);
}
async function clickStartNormalPathButton(browser: NightwatchBrowser) {
    await browser.click('#startNormalPath');
    await browser.pause(500);
}
async function clickEndNormalPathButton(browser: NightwatchBrowser) {
    await browser.click('#endNormalPath');
    await browser.pause(500);
}
async function clickNodeWithCertainId(browser: NightwatchBrowser, id: number) {
    await clickMxGraphElement(browser, 'graphElement_' + id);
    await browser.pause(500);
}
async function clickStartTruePathButton(browser: NightwatchBrowser) {
    await browser.click('#startPathTrue');
    await browser.pause(500);
}
async function clickEndTruePathButton(browser: NightwatchBrowser) {
    await browser.click('#endPathTrue');
    await browser.pause(500);
}
async function clickStartFalsePathButton(browser: NightwatchBrowser) {
    await browser.click('#startPathFalse');
    await browser.pause(500);
}
async function clickEndFalsePathButton(browser: NightwatchBrowser) {
    await browser.click('#endPathFalse');
    await browser.pause(500);
}
async function clickMxGraphElement(
    browser: NightwatchBrowser,
    elementId: string
) {
    const newElementId = await browser.execute(
        function (selector) {
            const element = document.querySelector('#' + selector);
            const rect = element!.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const target = document.elementFromPoint(centerX, centerY);
            const newId = selector + 'text';
            target!.id = newId;
            return newId;
        },
        [elementId]
    );
    await browser.click('#' + newElementId);
}
