<script setup lang="ts">
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { ref } from 'vue';

interface Props {
    fieldNames: string[];
}
const props = defineProps<Props>();
const selectedField = ref('');

const onVariableChange = () => {
    useParsedDataStore().priceVariableName = selectedField.value;
};
</script>

<template>
    <h2>Select the price variable:</h2>
    <div v-for="(fieldName, index) in fieldNames" :key="index">
        <input
            type="radio"
            :id="fieldName"
            :value="fieldName"
            v-model="selectedField"
            @change="onVariableChange"
        />
        <label :for="fieldName">{{ fieldName }}</label>
    </div>
</template>

<style scoped>
.dropzone {
    border: 2px dashed #ccc;
    border-radius: 10px;
    padding: 30px;
    text-align: center;
    margin: 10px;
}
</style>
