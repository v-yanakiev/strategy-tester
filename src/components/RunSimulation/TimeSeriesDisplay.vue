<script setup lang="ts">
import { onMounted, ref, nextTick, onActivated } from 'vue';
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
        return [date, price];
    })
    .filter((a) => a) as [Date, number][];

onActivated(async () => {
    await nextTick();
    const graph = new Dygraph(
        document.getElementById('graphDiv')!,
        dataToSend,
        { labels: ['Date', 'Price'], connectSeparatedPoints: false }
    );
});
</script>
<template>
    <div id="graphDiv"></div>
</template>
