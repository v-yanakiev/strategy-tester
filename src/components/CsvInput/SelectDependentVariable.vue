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
    <h2>
        Set a name for the new variable, the evolution of the value of which
        will be simulated according to your defined strategy (for instance,
        "capital")
    </h2>
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
