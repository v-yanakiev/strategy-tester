<script setup lang="ts">
import { useSimulationStore } from '@/stores/simulationStore';
import { ref } from 'vue';

const selectedVariableName = ref('');

const onVariableChange = () => {
    const balance = Number(selectedVariableName.value);
    if (Number.isNaN(balance) && balance <= 0) {
        return;
    }
    useSimulationStore().setInitialBalance(balance);
};
</script>

<template>
    <h2>Enter a value for your initial balance (in currency).</h2>
    <div>
        <input
            type="number"
            v-model="selectedVariableName"
            placeholder="Enter variable name"
        />
        <button @click="onVariableChange">Set Initial Balance</button>
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
