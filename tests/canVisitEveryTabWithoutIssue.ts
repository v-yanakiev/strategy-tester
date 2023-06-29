import * as nightwatch from 'nightwatch';
function redefineConsoleError() {
    let windowAny = window as any;
    console.error = function (message) {
        windowAny.errorLogs = windowAny.errorLogs || [];
        windowAny.errorLogs.push(message);
        throw new Error(message);
    };
}
export default {
    'Navigation Test': (browser: nightwatch.NightwatchBrowser) => {
        browser
            .url('http://localhost:4000/')
            .waitForElementVisible('body')
            .execute(redefineConsoleError)
            // Click on each RouterLink by its test-id
            .click('[test-id="dataInputLink"]')
            .pause(1000)
            .assert.urlContains('/dataInput') // Check the URL to verify navigation
            .click('[test-id="graphEditorLink"]')
            .pause(1000)
            .assert.urlContains('/graphEditor')
            .click('[test-id="runSimulationLink"]')
            .pause(1000)
            .assert.urlContains('/runSimulation')
            .click('[test-id="homeLink"]')
            .pause(1000)
            .assert.urlContains('/')
            .end();
    }
};
