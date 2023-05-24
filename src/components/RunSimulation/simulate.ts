import { getNodeValue } from '@/common/nodeCalculator';
import { useGraphStore } from '@/stores/graphStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { useSimulationStore } from '@/stores/simulationStore';

export function simulate() {
    const graphStore = useGraphStore();
    const simulationStore = useSimulationStore();
    const parsedDataStore = useParsedDataStore();
    const allConditions = graphStore
        .getAllConditions()
        .map((a) => getNodeValue(a));
    console.log(allConditions);
    const a = 5;
}
