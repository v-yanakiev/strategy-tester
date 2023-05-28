<script setup lang="ts">
import { useGraphStore } from '@/stores/graphStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { useSimulationStore } from '@/stores/simulationStore';
import { onMounted } from 'vue';
const parsedDataStore = useParsedDataStore();
const simulationStore = useSimulationStore();
const graphStore = useGraphStore();
</script>
<template>
    <h2 v-if="!parsedDataStore.parsedData">You haven't loaded data yet.</h2>
    <h2 v-else-if="!parsedDataStore.timeVariableName">
        You haven't set your time variable.
    </h2>
    <h2 v-else-if="!parsedDataStore.priceVariableName">
        You haven't set your price variable.
    </h2>
    <h2 v-else-if="simulationStore.getBalance() === null">
        You haven't set your initial balance.
    </h2>
    <h2 v-else-if="!graphStore.strategyCanBeGenerated">
        The graph is not valid.
    </h2>
    <div v-else>
        <!-- <div> -->
        <h2>You can run the simulation!</h2>
        <slot></slot>
    </div>
</template>
