import { NightwatchBrowser } from 'nightwatch';
import { inputDataAndSelectAllRequired } from '../csvInput/inputDataAndSelectAll';
let elementCount = 1;
export async function createCustomStrategy(browser: NightwatchBrowser) {
    await inputDataAndSelectAllRequired(browser);
    await browser.click('#graphEditorLink');
    await browser.pause(500);
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
    await clickNodeWithCertainId(browser, sellBlockId);
    await clickDeleteButton(browser);
    clickAddSellButton(browser);
    inputSellCondition(browser);
    const otherSellBlockId = await finalizeSellAction(browser);
    await clickNodeWithCertainId(browser, ifBlockId);
    await clickStartTruePathButton(browser);
    await clickNodeWithCertainId(browser, otherSellBlockId);
    await clickEndTruePathButton(browser);
    await clickNodeWithCertainId(browser, otherSellBlockId);
    await clickStartNormalPathButton(browser);
    await clickEndNode(browser);
    await clickEndNormalPathButton(browser);
}
async function clickAddIfBlock(browser: NightwatchBrowser) {
    await browser.click('#addIfBlockButton');
    await browser.pause(500);
}
async function inputIfCondition(browser: NightwatchBrowser) {
    await browser.setValue(
        '#ifStatementInput',
        'mathjs.mean(previousSteps.slice(previousSteps.length-20, undefined).map(a=> a.Open)) < currentStep.Open'
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
    await browser.click('#graphElement_startNode');
    await browser.pause(500);
}
async function clickEndNode(browser: NightwatchBrowser) {
    await browser.click('#graphElement_endNode');
    await browser.pause(500);
}
async function clickStartNormalPathButton(browser: NightwatchBrowser) {
    await browser.click('#startNormalPath');
    await browser.pause(500);
}
async function clickEndNormalPathButton(browser: NightwatchBrowser) {
    await browser.click('#endNormalPath');
    await browser.pause(500);
    return ++elementCount;
}
async function clickNodeWithCertainId(browser: NightwatchBrowser, id: number) {
    await browser.click('#graphElement_' + id);
    await browser.pause(500);
}
async function clickStartTruePathButton(browser: NightwatchBrowser) {
    await browser.click('#startPathTrue');
    await browser.pause(500);
}
async function clickEndTruePathButton(browser: NightwatchBrowser) {
    await browser.click('#endPathTrue');
    await browser.pause(500);
    return ++elementCount;
}
async function clickStartFalsePathButton(browser: NightwatchBrowser) {
    await browser.click('#startPathFalse');
    await browser.pause(500);
}
async function clickEndFalsePathButton(browser: NightwatchBrowser) {
    await browser.click('#endPathFalse');
    await browser.pause(500);
    return ++elementCount;
}
async function clickDeleteButton(browser: NightwatchBrowser) {
    await browser.click('#deleteButton');
    await browser.pause(500);
}
