<script setup lang="ts">
import { useGraphStore } from '@/stores/graphStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { ref } from 'vue';
import TimeSeriesDisplay from './TimeSeriesDisplay.vue';
import { simulate } from './simulate';
import { SimulationState, useSimulationStore } from '@/stores/simulationStore';

const simulationStore = useSimulationStore();
function runSimulation() {
    simulate();
}
</script>
<template>
    <button
        v-if="simulationStore.state == SimulationState.NotStarted"
        @click="runSimulation"
    >
        Run simulation
    </button>

    <TimeSeriesDisplay
        v-if="simulationStore.state == SimulationState.TimeSeriesGenerated"
    />
</template>
