<script setup lang="ts">
const emits = defineEmits(['strategySelected']);
function emitSMA() {
    emits(
        'strategySelected',
        'mathjs.mean(previousSteps.slice(previousSteps.length-20,undefined).map(a=>a.Open))>currentStep.Open'
    );
}
function emitEMA() {}
function emitMACD() {}
function emitBB() {}
</script>

<template>
    <h1>Може да заредите примерни стратегии:</h1>
    <button @click="emitSMA">Simple Moving Average (SMA)</button>
    <button @click="emitEMA">Exponential Moving Average (EMA)</button>
    <button @click="emitMACD">
        Moving Average Convergence Divergence (MACD)
    </button>
    <button @click="emitBB">Bollinger Bands</button>
</template>
<style scoped></style>
