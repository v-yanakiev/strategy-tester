<script setup lang="ts">
import { onMounted, ref, nextTick, onActivated, onDeactivated } from 'vue';
import Dygraph from 'dygraphs';
import { useSimulationStore } from '@/stores/simulationStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
const simulationStore = useSimulationStore();
const parsedDataStore = useParsedDataStore();
const originalData = parsedDataStore.getNonProxyParsedData()!;
const priceVariableName = parsedDataStore.priceVariableName!;
const timeVariableName = parsedDataStore.timeVariableName!;
const dataToSend = originalData.data
    .map((step, index) => {
        let parsed = Date.parse(step[timeVariableName]);
        const date = new Date(parsed);
        const price = step[priceVariableName];
        if (isNaN(date.getTime()) || !(typeof price == 'number')) {
            return null;
        }
        return [
            date,
            simulationStore.moneyBalances[index],
            simulationStore.quantitiesOfAssetInPossession[index] * price,
            simulationStore.moneyBalances[index] +
                simulationStore.quantitiesOfAssetInPossession[index] * price
        ];
    })
    .filter((a) => a) as [Date, number, number, number][];
const priceData = originalData.data
    .map((step, index) => {
        let parsed = Date.parse(step[timeVariableName]);
        const date = new Date(parsed);
        const price = step[priceVariableName];
        if (isNaN(date.getTime()) || !(typeof price == 'number')) {
            return null;
        }
        return [date, price];
    })
    .filter((a) => a) as [Date, number, number, number][];
let graph: Dygraph | null;
onMounted(() => {
    mountGraph();
});
onActivated(async () => {
    mountGraph();
});
onDeactivated(async () => {
    await nextTick();
    graph?.destroy();
});
async function mountGraph() {
    await nextTick();
    if (document.getElementById('graphDivPrice')) {
        graph = new Dygraph(
            document.getElementById('graphDivPrice')!,
            priceData,
            {
                labels: ['Дата', 'Цена'],
                ...partOfVisualizationConfig
            }
        );
    }
    if (document.getElementById('graphDivSimulation')) {
        graph = new Dygraph(
            document.getElementById('graphDivSimulation')!,
            dataToSend,
            {
                labels: [
                    'Дата',
                    'Останали пари',
                    'Стойност на притежаваните активите',
                    'Пари+стойност на активите'
                ],
                ...partOfVisualizationConfig
            }
        );
    }
}
const partOfVisualizationConfig = {
    connectSeparatedPoints: false,
    labelsSeparateLines: true,
    logscale: false,
    axisLabelWidth: 250
};
</script>
<template>
    <p>Цена на актив:</p>
    <div id="graphDivPrice"></div>
    <br />
    <p>Симулация на стратегия:</p>

    <div id="graphDivSimulation"></div>
</template>
<style scoped>
.dygraph-axis-label-y {
    transform: translateX(10px);
}
</style>
