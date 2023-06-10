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
const dataToSend = originalData

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
            simulationStore.quantitiesOfAssetInPossession[index],
            simulationStore.moneyBalances[index] +
                simulationStore.quantitiesOfAssetInPossession[index] * price
        ];
    })
    .filter((a) => a) as [Date, number, number, number][];

const priceData = originalData
    .map((step) => {
        let parsed = Date.parse(step[timeVariableName]);
        const date = new Date(parsed);
        const price = step[priceVariableName];
        if (isNaN(date.getTime()) || !(typeof price == 'number')) {
            return null;
        }
        return [date, price];
    })
    .filter((a) => a) as [Date, number][];

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
    const names = {
        Price: 'Цена',
        moneyBalance: 'Останали пари',
        assetValue: 'Брой на притежаваните активите',
        totalValue: 'Пари+стойност на активите'
    };
    graphs = ['Price', 'moneyBalance', 'assetValue', 'totalValue'].map((id) => {
        let data: any;
        switch (id) {
            case 'Price':
                data = priceData;
                break;
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
                throw `Unexpected id ${id}`;
        }
        return new Dygraph(document.getElementById(`graphDiv${id}`)!, data, {
            labels: ['Дата', names[id]],
            underlayCallback: function (canvas, area, g) {
                const finalValueY = g.toDomYCoord(data[data.length - 1][1])!;
                canvas.beginPath();
                canvas.font = '20px Arial';
                canvas.moveTo(area.x, finalValueY);
                canvas.lineTo(area.x + area.w, finalValueY);
                canvas.lineWidth = 1;
                canvas.strokeStyle = 'black';
                canvas.stroke();
                const textXPosition = area.x;
                const textYPosition = finalValueY + 20;
                canvas.fillText(
                    `Финална стойност: ${data[data.length - 1][1]}`,
                    textXPosition,
                    textYPosition
                );
            },
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
    <h3>Цена на актив:</h3>
    <div id="graphDivPrice"></div>
    <br />
    <h3>Пари+стойност на активите:</h3>
    <div id="graphDivtotalValue"></div>
    <h3>Останали пари:</h3>
    <div id="graphDivmoneyBalance"></div>
    <br />
    <h3>Брой на притежаваните активите:</h3>
    <div id="graphDivassetValue"></div>
    <br />
</template>

<style scoped>
.dygraph-axis-label-y {
    transform: translateX(10px);
}
</style>
