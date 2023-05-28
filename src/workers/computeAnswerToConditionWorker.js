import * as ss from 'simple-statistics';
import * as mathjs from 'mathjs';
import * as workerpool from 'workerpool-passable-options';
import * as indicatorts from 'indicatorts';
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
        ss,
        mathjs,
        indicatorts
    );
}

// export the worker tasks
workerpool.worker({
    computeAnswerToCondition: computeAnswerToCondition
});
