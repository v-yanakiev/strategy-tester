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
            price,
            simulationStore.moneyBalances[index],
            simulationStore.quantitiesOfAssetInPossession[index] * price
        ];
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
    if (document.getElementById('graphDiv')) {
        graph = new Dygraph(document.getElementById('graphDiv')!, dataToSend, {
            labels: ['Date', 'Price', 'Money left', 'Value of assets'],
            connectSeparatedPoints: true,
            labelsSeparateLines: true,
            logscale: true,
            axisLabelWidth: 200
        });
    }
}
</script>
<template>
    <div id="graphDiv"></div>
</template>
<style scoped>
.dygraph-axis-label-y {
    transform: translateX(10px);
}
</style>
