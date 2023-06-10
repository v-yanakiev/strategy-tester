<template>
    <h2>Ако желаете, изберете дата и час, от които да започне симулацията:</h2>
    <input
        type="datetime-local"
        v-model="simulationStore.startCutOffDate"
        :min="earliestDateInDataset"
        :max="lastDateInDataset"
    />
    <br />
    <h2>
        Ако желаете, изберете дата и час, след които да завърши симулацията:
    </h2>
    <input
        type="datetime-local"
        v-model="simulationStore.endCutOffDate"
        :min="earliestDateInDataset"
        :max="lastDateInDataset"
    />
</template>

<script setup lang="ts">
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { useSimulationStore } from '@/stores/simulationStore';

const simulationStore = useSimulationStore();
const parsedDataStore = useParsedDataStore();
const earliestDateInDataset =
    parsedDataStore.parsedData!.data[0][parsedDataStore.timeVariableName!];
const lastDateInDataset =
    parsedDataStore.parsedData!.data[
        parsedDataStore.parsedData!.data.length - 1
    ][parsedDataStore.timeVariableName!];
</script>
