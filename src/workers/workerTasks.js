importScripts(
    '../../node_modules/simple-statistics/dist/simple-statistics.js',
    '../../node_modules/mathjs/dist/math.js'
);
// worker task for calculating condition
function calculateCondition(conditionValue, currentStep, previousSteps) {
    console.log(conditionValue);
    const calculateFunction =
        transformConditionValueIntoValueReturningFunction(conditionValue);
    return calculateFunction(
        currentStep,
        previousSteps,
        null,
        null,
        ss,
        mathjs
    );
}
function transformConditionValueIntoValueReturningFunction(conditionValue) {
    return new Function(
        'currentStep',
        'previousSteps',
        'currentBalance',
        'previousBalances',
        'ss',
        'mathjs',
        `return ${conditionValue}`
    );
}

// export the worker tasks
module.exports = {
    calculateCondition
};
