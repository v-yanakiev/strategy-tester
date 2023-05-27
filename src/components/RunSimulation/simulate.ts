import {
    getNodeValue,
    transformConditionValueIntoValueReturningFunction
} from '@/common/nodeCalculator';
import { useGraphStore } from '@/stores/graphStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { SimulationState, useSimulationStore } from '@/stores/simulationStore';
import * as ss from 'simple-statistics';
import * as mathjs from 'mathjs';
import workerpool from 'workerpool';
import type { Cell } from '@maxgraph/core';
export async function simulate() {
    const graphStore = useGraphStore();
    const simulationStore = useSimulationStore();
    const parsedDataStore = useParsedDataStore();
    const pool = (workerpool.pool as any)(
        new URL(
            '../../workers/computeAnswerToConditionWorker.js',
            import.meta.url
        ),
        {
            type: 'module'
        }
    );
    const steps = parsedDataStore
        .getNonProxyParsedData()!
        .data.sort((a) => a[parsedDataStore.timeVariable!]);
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
                transformConditionValueIntoValueReturningFunction(
                    getNodeValue(condition)
                )
            );
        } else {
            //can be precalculated across all steps
            nodeAndItsConditionsResultOverTime.set(condition.id!, []);
            for (let i = 0; i < 5000; i++) {
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
    pool.exec('computeAnswerToCondition', [
        getNodeValue(condition),
        steps[lockedIndex],
        steps.slice(0, lockedIndex)
    ])
        .then((result) => {
            const array = nodeAndItsConditionsResultOverTime.get(
                lockedConditionId
            ) as boolean[];
            array[lockedIndex] = result;
        })
        .catch((error) => {
            console.log('error: ');
            console.log(error);
        })
        .then((maybeAnswer) => {
            if (
                pool.stats().pendingTasks === 0 &&
                pool.stats().activeTasks === 0
            ) {
                console.log(maybeAnswer);
                pool.terminate();
                //console.log(nodeAndItsConditionsResultOverTime.values);
                simulationStore.state =
                    SimulationState.InitialCalculationsFinished;
            }
        });
}
