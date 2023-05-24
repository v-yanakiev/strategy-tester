<script setup lang="ts">
import { useGraphStore } from '@/stores/graphStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { ref } from 'vue';
import CanSimulationBeRan from '../common/CanSimulationBeRan.vue';
const simulationCanBeRan = ref(false);
function setCalculationResult(resultValue: boolean) {
    simulationCanBeRan.value = resultValue;
}
</script>
<template>
    <button>Run simulation</button>
</template>
