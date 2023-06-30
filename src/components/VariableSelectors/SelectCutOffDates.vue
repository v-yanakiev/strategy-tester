<template>
    <h2>
        Ако желаете, изберете време и дата, от които да започне симулацията:
    </h2>
    <input
        type="datetime-local"
        v-model="simulationStore.startCutOffDate"
        v-test-id="'simulationStartDate'"
        :min="earliestDateInDataset"
        :max="lastDateInDataset"
    />
    <br />
    <h2>
        Ако желаете, изберете време и дата, след които да завърши симулацията:
    </h2>
    <input
        type="datetime-local"
        v-test-id="'simulationEndDate'"
        v-model="simulationStore.endCutOffDate"
        :min="earliestDateInDataset"
        :max="lastDateInDataset"
    />
</template>

<script setup lang="ts">
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { useSimulationStore } from '@/stores/simulationStore';
import _ from 'lodash';
const simulationStore = useSimulationStore();
const parsedDataStore = useParsedDataStore();
const earliestDateInDataset = new Date(
    _.find(
        parsedDataStore.parsedData?.data,
        (value) => value[parsedDataStore.timeVariableName!]
    )[parsedDataStore.timeVariableName!]
).toISOString();
const lastDateInDataset = new Date(
    _.findLast(
        parsedDataStore.parsedData?.data,
        (value) => value[parsedDataStore.timeVariableName!]
    )[parsedDataStore.timeVariableName!]
).toISOString();
</script>
