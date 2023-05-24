<script setup lang="ts">
import { useGraphStore } from '@/stores/graphStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { ref } from 'vue';
import CanSimulationBeRan from '../common/CanSimulationBeRan.vue';

const simulationIsRunning = ref(false);
function runSimulation() {
    simulationIsRunning.value = true;
}
function stopSimulation() {}
</script>
<template>
    <button v-if="simulationIsRunning" @click="runSimulation">
        Run simulation
    </button>
    <button @click="stopSimulation" v-else>Stop simulation</button>
</template>
