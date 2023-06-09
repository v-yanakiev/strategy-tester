import * as simplestats from 'simple-statistics';
import * as mathjs from 'mathjs';
import * as workerpool from 'workerpool-passable-options';
import * as technicalindicators from 'technicalindicators';
import transformConditionValueIntoValueReturningFunction from '../common/nodeCalculator';
// worker task for calculating condition
function computeAnswerToCondition(conditionValue, currentStep, previousSteps) {
    const calculateFunction =
        transformConditionValueIntoValueReturningFunction(conditionValue);
    return calculateFunction(
        currentStep,
        previousSteps,
        null,
        null,
        simplestats,
        mathjs,
        technicalindicators
    );
}

// export the worker tasks
workerpool.worker({
    computeAnswerToCondition: computeAnswerToCondition
});
