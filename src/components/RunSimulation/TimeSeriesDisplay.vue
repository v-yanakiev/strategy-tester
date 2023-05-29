<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import Dygraph from 'dygraphs';
import { useSimulationStore } from '@/stores/simulationStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
const simulationStore = useSimulationStore();
const parsedDataStore = useParsedDataStore();
onMounted(async () => {
    const originalData = parsedDataStore.getNonProxyParsedData()!;
    setTimeout(() => {
        const graph = new Dygraph(
            document.getElementById('graphDiv')!,
            originalData.data.map((step) => {
                const toReturn = [
                    new Date(step[parsedDataStore.timeVariableName!]),
                    step[parsedDataStore.priceVariableName!]
                ];
                return toReturn;
            }),
            { labels: ['Date', 'Price'] }
        );
    }, 100);
});
</script>
<template>
    <div id="graphDiv"></div>
</template>
