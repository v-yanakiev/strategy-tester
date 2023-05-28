<script setup lang="ts">
import { useGraphStore } from '@/stores/graphStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { ref } from 'vue';
import CanSimulationBeRan from '../common/CanSimulationBeRan.vue';
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

    <div
        v-if="
            simulationStore.state ==
            SimulationState.SimulatedTimeSeriesGenerated
        "
    >
        Stop simulation
    </div>
</template>
