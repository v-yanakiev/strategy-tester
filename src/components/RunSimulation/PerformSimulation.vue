<script setup lang="ts">
import { useGraphStore } from '@/stores/graphStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { ref } from 'vue';
import TimeSeriesDisplay from './TimeSeriesDisplay.vue';
import { simulate } from './simulate';
import { SimulationState, useSimulationStore } from '@/stores/simulationStore';

const simulationStore = useSimulationStore();
function runSimulation() {
    simulationStore.moneyBalances = [];
    simulationStore.quantitiesOfAssetInPossession = [];
    simulationStore.state = SimulationState.StartingCalculations;
    setTimeout(() => simulate(), 100);
}
function stopSimulation() {
    simulationStore.moneyBalances = [];
    simulationStore.quantitiesOfAssetInPossession = [];
    simulationStore.state = SimulationState.NotStarted;
}
</script>
<template>
    <button
        v-test-id="'startSimulationButton'"
        v-if="
            simulationStore.state == SimulationState.NotStarted ||
            simulationStore.state == SimulationState.AllCalculationsFinished
        "
        @click="runSimulation"
    >
        Пусни симулацията
    </button>
    <p v-else @click="stopSimulation">Симулация в прогрес...</p>

    <TimeSeriesDisplay
        v-if="simulationStore.state == SimulationState.AllCalculationsFinished"
    />
</template>
