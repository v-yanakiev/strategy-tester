<script setup lang="ts">
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { ref } from 'vue';

const selectedField = ref('');
const dataStore = useParsedDataStore();
const onTimeVariableChange = () => {
    dataStore.timeVariableName = selectedField.value;
};
</script>

<template>
    <h2>Изберете коя е времевата променлива:</h2>
    <div v-test-id="'possibleTimeVariables'">
        <div v-for="(fieldName, index) in dataStore.fields" :key="index">
            <input
                type="radio"
                :value="fieldName"
                v-model="selectedField"
                @change="onTimeVariableChange"
                name="timeVariable"
            />
            <label :for="fieldName">{{ fieldName }}</label>
        </div>
    </div>
</template>

<style scoped></style>
