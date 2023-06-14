<script setup lang="ts">
import { useGraphStore } from '@/stores/graphStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { useSimulationStore } from '@/stores/simulationStore';
const parsedDataStore = useParsedDataStore();
const simulationStore = useSimulationStore();
const graphStore = useGraphStore();
</script>
<template>
    <h2 v-if="!parsedDataStore.parsedData">Не сте заредили данни.</h2>
    <h2 v-else-if="!parsedDataStore.timeVariableName">
        Не сте задали времева променлива.
    </h2>
    <h2 v-else-if="!parsedDataStore.priceVariableName">
        Не сте задали ценова променлива.
    </h2>
    <h2 v-else-if="!simulationStore.getInitialBalance()">
        Не сте задали първоначален баланс.
    </h2>
    <h2 v-else-if="!graphStore.strategyCanBeGenerated">Графът не е валиден.</h2>
    <div v-else>
        <slot></slot>
    </div>
</template>
