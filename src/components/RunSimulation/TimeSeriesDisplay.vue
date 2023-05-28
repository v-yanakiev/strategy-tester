<script setup lang="ts">
import { simulate } from './simulate';
import { SimulationState, useSimulationStore } from '@/stores/simulationStore';

const simulationStore = useSimulationStore();
function runSimulation() {
    simulate();
}
</script>
<template></template>
