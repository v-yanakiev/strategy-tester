<script setup lang="ts">
import { useSimulationStore } from '@/stores/simulationStore';
import { ref } from 'vue';

const selectedVariableName = ref('');

const onVariableChange = () => {
    useSimulationStore().setPriceVariableName(selectedVariableName.value);
};
</script>

<template>
    <h2>
        Set a name for a new variable, the evolution of the value of which will
        be simulated according to your defined strategy (for example,
        "capital").
    </h2>
    <div>
        <input
            type="text"
            v-model="selectedVariableName"
            placeholder="Enter variable name"
        />
        <button @click="onVariableChange">Set Variable Name</button>
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
