<template>
    <h2>
        Ако желаете, изберете време и дата, от които да започне симулацията:
    </h2>
    <input
        type="datetime-local"
        v-model="simulationStore.startCutOffDateString"
        v-test-id="'simulationStartDate'"
    />
    <br />
    <h2 class="error" v-if="showInvalidStartCutOffDate">
        Избрахте начално време и дата извън данните, които започват на
        {{ earliestDateInDataset.toLocaleString() }} и завършват на
        {{ lastDateInDataset.toLocaleString() }}
    </h2>
    <h2>
        Ако желаете, изберете време и дата, след които да завърши симулацията:
    </h2>
    <input
        type="datetime-local"
        v-test-id="'simulationEndDate'"
        v-model="simulationStore.endCutOffDateString"
    />
    <h2 class="error" v-if="showInvalidEndCutOffDateError">
        Избрахте крайно време и дата извън данните, които започват на
        {{ earliestDateInDataset.toLocaleString() }} и завършват на
        {{ lastDateInDataset.toLocaleString() }}
    </h2>
</template>

<script setup lang="ts">
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { useSimulationStore } from '@/stores/simulationStore';
import _ from 'lodash';
import { ref, watch } from 'vue';
const simulationStore = useSimulationStore();
const parsedDataStore = useParsedDataStore();
const showInvalidStartCutOffDate = ref(false);
const showInvalidEndCutOffDateError = ref(false);
const earliestDateInDataset = new Date(
    _.find(
        parsedDataStore.parsedData?.data,
        (value) => value[parsedDataStore.timeVariableName!]
    )[parsedDataStore.timeVariableName!]
);
const lastDateInDataset = new Date(
    _.findLast(
        parsedDataStore.parsedData?.data,
        (value) => value[parsedDataStore.timeVariableName!]
    )[parsedDataStore.timeVariableName!]
);
const destroyInvalidDateResetter = watch(
    () => [
        simulationStore.startCutOffDateString,
        simulationStore.endCutOffDateString
    ],
    () => {
        if (simulationStore.startCutOffDateString) {
            const startCutOffDate = new Date(
                simulationStore.startCutOffDateString
            );
            if (
                startCutOffDate < earliestDateInDataset ||
                startCutOffDate > lastDateInDataset
            ) {
                showInvalidStartCutOffDate.value = true;
                simulationStore.startCutOffDateString = null;
            } else {
                showInvalidStartCutOffDate.value = false;
            }
        }

        if (simulationStore.endCutOffDateString) {
            const endCutOffDate = new Date(simulationStore.endCutOffDateString);
            if (
                endCutOffDate < earliestDateInDataset ||
                endCutOffDate > lastDateInDataset
            ) {
                showInvalidEndCutOffDateError.value = true;
                simulationStore.endCutOffDateString = null;
            } else {
                showInvalidEndCutOffDateError.value = false;
            }
        }
    }
);
</script>
<style>
.error {
    color: red;
}
</style>
