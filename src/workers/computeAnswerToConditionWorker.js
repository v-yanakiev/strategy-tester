import * as ss from 'simple-statistics';
import * as mathjs from 'mathjs';
import * as workerpool from 'workerpool-passable-options';

// worker task for calculating condition
function computeAnswerToCondition(conditionValue, currentStep, previousSteps) {
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
workerpool.worker({
    computeAnswerToCondition: computeAnswerToCondition
});
