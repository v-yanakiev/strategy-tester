<script setup lang="ts">
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { ref } from 'vue';

const selectedField = ref('');
const dataStore = useParsedDataStore();

const onVariableChange = () => {
    dataStore.priceVariableName = selectedField.value;
};
</script>

<template>
    <h2>Изберете коя е ценовата променлива:</h2>
    <div v-test-id="'possiblePriceVariables'">
        <div v-for="(fieldName, index) in dataStore.fields" :key="index">
            <input
                type="radio"
                :value="fieldName"
                v-model="selectedField"
                @change="onVariableChange"
                name="priceVariable"
            />
            <label :for="fieldName">{{ fieldName }}</label>
        </div>
    </div>
</template>

<style scoped></style>
