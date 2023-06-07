<script setup lang="ts">
const emits = defineEmits(['strategySelected']);
function emitSMA() {
    emits(
        'strategySelected',
        'mathjs.mean(previousSteps.slice(previousSteps.length-20,undefined).map(a=>a.Open))>currentStep.Open'
    );
}
function emitEMA() {
    emits(
        'strategySelected',
        'indicatorts.ema(5).map((a)=>a.Open))[previousSteps.length-1]>currentStep.Open'
    );
}
function emitMACD() {
    emits(
        'strategySelected',
        'indicatorts.macd(previousSteps).macdLine>currentStep.Open'
    );
}
function emitRSI() {
    emits(
        'strategySelected',
        'indicatorts.rsi(previousSteps)[previousSteps.length-1]>currentStep.Open'
    );
}
</script>

<template>
    <h1>Може да заредите примерни стратегии:</h1>
    <button @click="emitSMA">Simple Moving Average (SMA)</button>
    <button @click="emitEMA">Exponential Moving Average (EMA)</button>
    <button @click="emitMACD">
        Moving Average Convergence Divergence (MACD)</button
    ><button @click="emitRSI">Relative Strength Index (RSI)</button>
</template>
<style scoped></style>
