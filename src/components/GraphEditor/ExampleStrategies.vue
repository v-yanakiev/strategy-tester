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
        'technicalindicators.ema({period:5,values:previousSteps.map((a)=>a.Open)}).slice(-1)[0]>currentStep.Open'
    );
}
function emitMACD() {
    emits(
        'strategySelected',
        'technicalindicators.macd({values:previousSteps.map((a)=>a.Open),fastPeriod:5,slowPeriod:8,signalPeriod:3}).slice(-1)[0]?.MACD>' +
            'technicalindicators.macd({values:previousSteps.map((a)=>a.Open),fastPeriod:5,slowPeriod:8,signalPeriod:3}).slice(-1)[0]?.signal',
        'technicalindicators.macd({values:previousSteps.map((a)=>a.Open),fastPeriod:5,slowPeriod:8,signalPeriod:3}).slice(-1)[0]?.MACD<' +
            'technicalindicators.macd({values:previousSteps.map((a)=>a.Open),fastPeriod:5,slowPeriod:8,signalPeriod:3}).slice(-1)[0]?.signal'
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
    <button v-test-id="'SMAStrategyButton'" @click="emitSMA">
        Simple Moving Average (SMA)
    </button>
    <button v-test-id="'EMAStrategyButton'" @click="emitEMA">
        Exponential Moving Average (EMA)
    </button>
    <button v-test-id="'MACDStrategyButton'" @click="emitMACD">
        Moving Average Convergence Divergence (MACD)</button
    ><button v-test-id="'RSIStrategyButton'" @click="emitRSI">
        Relative Strength Index (RSI)
    </button>
</template>
<style scoped></style>
