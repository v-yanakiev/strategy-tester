<script setup lang="ts">
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { ref } from 'vue';

interface Props {
    fieldNames: string[];
}
const props = defineProps<Props>();
const selectedField = ref('');

const onFieldChange = () => {
    useParsedDataStore().setTimeVariable(selectedField.value);
    alert(`Selected field: ${selectedField.value}`);
};
</script>

<template>
    <h2>Which variable is the time variable?</h2>
    <div v-for="(fieldName, index) in fieldNames" :key="index">
        <input
            type="radio"
            :id="fieldName"
            :value="fieldName"
            v-model="selectedField"
            @change="onFieldChange"
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
