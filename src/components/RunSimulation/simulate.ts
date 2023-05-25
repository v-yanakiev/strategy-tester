import {
    getNodeValue,
    transformConditionIntoValueReturningFunction
} from '@/common/nodeCalculator';
import { useGraphStore } from '@/stores/graphStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { SimulationState, useSimulationStore } from '@/stores/simulationStore';
import * as ss from 'simple-statistics';
import * as mathjs from 'mathjs';
import workerpool from 'workerpool';
import type { Cell } from '@maxgraph/core';
export function simulate() {
    const graphStore = useGraphStore();
    const simulationStore = useSimulationStore();
    const parsedDataStore = useParsedDataStore();
    const pool = workerpool.pool();
    const steps = parsedDataStore.parsedData!.data.sort(
        (a) => a[parsedDataStore.timeVariable!]
    );
    const nodeAndItsConditionsResultOverTime = new Map<
        string,
        Function | boolean[]
    >();
    const allConditions = graphStore.getAllConditions();
    for (const condition of allConditions) {
        if (
            (getNodeValue(condition) as string).includes('currentBalance') ||
            (getNodeValue(condition) as string).includes('previousBalances')
        ) {
            //cannot be precalculated
            nodeAndItsConditionsResultOverTime.set(
                condition.id!,
                transformConditionIntoValueReturningFunction(condition)
            );
        } else {
            //can be precalculated across all steps
            nodeAndItsConditionsResultOverTime.set(condition.id!, []);
            for (let i = 0; i < steps.length; i++) {
                calculate(
                    pool,
                    condition,
                    steps,
                    nodeAndItsConditionsResultOverTime,
                    i,
                    condition.id!,
                    simulationStore
                );
            }
        }
    }
}
function calculate(
    pool: workerpool.WorkerPool,
    condition: Cell,
    steps: any[],
    nodeAndItsConditionsResultOverTime: Map<string, Function | boolean[]>,
    lockedIndex: number,
    lockedConditionId: string,
    simulationStore: any
) {
    pool.exec(transformConditionIntoValueReturningFunction(condition), [
        ss,
        mathjs,
        steps[lockedIndex],
        steps.slice(0, lockedIndex),
        steps,
        null,
        null
    ])
        .then((result) => {
            const array = nodeAndItsConditionsResultOverTime.get(
                lockedConditionId
            ) as boolean[];
            array[lockedIndex] = result;
        })
        .then(() => {
            if (
                pool.stats().pendingTasks === 0 &&
                pool.stats().activeTasks === 0
            ) {
                pool.terminate();
                simulationStore.state =
                    SimulationState.InitialCalculationsFinished;
            }
        });
}
