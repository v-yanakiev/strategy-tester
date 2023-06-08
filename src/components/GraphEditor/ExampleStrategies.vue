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
        'technicalindicators.ema({period:5,values:previousSteps.map((a)=>a.Open)}).slice(-1)[0]>>currentStep.Open'
    );
}
function emitMACD() {
    emits(
        'strategySelected',
        'technicalindicators.macd(previousSteps.map((a)=>a.Open)).macdLine>30'
    );
}
function emitRSI() {
    emits(
        'strategySelected',
        'technicalindicators.rsi({period:5,values:previousSteps.map((a)=>a.Open)}).slice(-1)[0]>70',
        'technicalindicators.rsi({period:5,values:previousSteps.map((a)=>a.Open)}).slice(-1)[0]<30'
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
