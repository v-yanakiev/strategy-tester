<script setup lang="ts">
import { onMounted, ref, nextTick, onActivated, onDeactivated } from 'vue';
import Dygraph from 'dygraphs';
import { useSimulationStore } from '@/stores/simulationStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
const simulationStore = useSimulationStore();
const parsedDataStore = useParsedDataStore();
const originalData = parsedDataStore.getNonProxyParsedData()!;
const priceVariableName = parsedDataStore.priceVariableName!;
const timeVariableName = parsedDataStore.timeVariableName!;
const dataToSend = originalData.data
    .map((step, index) => {
        let parsed = Date.parse(step[timeVariableName]);
        const date = new Date(parsed);
        const price = step[priceVariableName];
        if (isNaN(date.getTime()) || !(typeof price == 'number')) {
            return null;
        }
        return [
            date,
            simulationStore.moneyBalances[index],
            simulationStore.quantitiesOfAssetInPossession[index] * price,
            simulationStore.moneyBalances[index] +
                simulationStore.quantitiesOfAssetInPossession[index] * price
        ];
    })
    .filter((a) => a) as [Date, number, number, number][];

// Splitting data for each variable
const moneyBalanceData = dataToSend.map((item) => [item[0], item[1]]);
const assetValueData = dataToSend.map((item) => [item[0], item[2]]);
const totalValueData = dataToSend.map((item) => [item[0], item[3]]);

let graphs: Dygraph[] = [];
onMounted(() => {
    mountGraph();
});
onActivated(async () => {
    mountGraph();
});
onDeactivated(async () => {
    await nextTick();
    graphs.forEach((graph) => graph.destroy());
});
async function mountGraph() {
    await nextTick();
    graphs = ['moneyBalance', 'assetValue', 'totalValue'].map((id) => {
        let data;
        switch (id) {
            case 'moneyBalance':
                data = moneyBalanceData;
                break;
            case 'assetValue':
                data = assetValueData;
                break;
            case 'totalValue':
                data = totalValueData;
                break;
            default:
                throw '';
        }
        return new Dygraph(document.getElementById(`graphDiv${id}`)!, data, {
            labels: ['Дата', id],
            ...partOfVisualizationConfig
        });
    });
}
const partOfVisualizationConfig = {
    connectSeparatedPoints: false,
    labelsSeparateLines: true,
    logscale: false,
    axisLabelWidth: 400,
    width: 1500
};
</script>

<template>
    <p>Цена на актив:</p>
    <div id="graphDivPrice"></div>
    <br />
    <p>Останали пари:</p>
    <div id="graphDivmoneyBalance"></div>
    <br />
    <p>Стойност на притежаваните активите:</p>
    <div id="graphDivassetValue"></div>
    <br />
    <p>Пари+стойност на активите:</p>
    <div id="graphDivtotalValue"></div>
</template>

<style scoped>
.dygraph-axis-label-y {
    transform: translateX(10px);
}
</style>
