<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Dygraph from 'dygraphs';
import { useSimulationStore } from '@/stores/simulationStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
const graphdiv = ref<HTMLDivElement>();
const simulationStore = useSimulationStore();
const parsedDataStore = useParsedDataStore();
onMounted(() => {
    const originalData = parsedDataStore.getNonProxyParsedData()!;
    const graph = new Dygraph(
        graphdiv.value!,
        originalData.data.map((step) => [
            step[parsedDataStore.timeVariableName!],
            step[parsedDataStore.priceVariableName!]
        ])
    );
});
</script>
<template>
    <div id="graphdiv"></div>
</template>
