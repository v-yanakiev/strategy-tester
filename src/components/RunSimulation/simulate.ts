import {
    getNodeValue,
    transformConditionIntoValueReturningFunction
} from '@/common/nodeCalculator';
import { useGraphStore } from '@/stores/graphStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { useSimulationStore } from '@/stores/simulationStore';
import * as ss from 'simple-statistics';
import * as mathjs from 'mathjs';
export function simulate() {
    const graphStore = useGraphStore();
    const simulationStore = useSimulationStore();
    const parsedDataStore = useParsedDataStore();
    const allConditions = graphStore
        .getAllConditions()
        .map((a) => transformConditionIntoValueReturningFunction(a));
    allConditions.forEach((a) => {
        try {
            console.log(a(ss, mathjs));
        } catch (e) {}
    });
}
