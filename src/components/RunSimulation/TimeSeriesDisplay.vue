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
function roundNumber(num: number, scale = 2): number {
    let scalePow = Math.pow(10, scale);
    return Math.round(num * scalePow) / scalePow;
}

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
            roundNumber(simulationStore.moneyBalances[index]),
            roundNumber(simulationStore.quantitiesOfAssetInPossession[index]),
            roundNumber(
                simulationStore.moneyBalances[index] +
                    simulationStore.quantitiesOfAssetInPossession[index] * price
            ),
            roundNumber(
                simulationStore.maxQuantityThatCouldHaveBeenPurchasedInTheBeginning *
                    price +
                    simulationStore.moneyLeftAfterMaxPurchase
            )
        ];
    })
    .filter((a) => a) as [Date, number, number, number, number][];

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
const assetCountData = dataToSend.map((item) => [item[0], item[2]]);
const totalValueData = dataToSend.map((item) => [item[0], item[3]]);
const maxPurchaseStrategyData = dataToSend.map((item) => [item[0], item[4]]);

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
        assetCount: 'Брой на притежаваните активи',
        totalValue: 'Пари+стойност на активите',
        maxPurchaseStrategy: 'Пари+стойност на активите'
    };
    graphs = Object.keys(names).map((id) => {
        let data: any;
        switch (id) {
            case 'Price':
                data = priceData;
                break;
            case 'moneyBalance':
                data = moneyBalanceData;
                break;
            case 'assetCount':
                data = assetCountData;
                break;
            case 'totalValue':
                data = totalValueData;
                break;
            case 'maxPurchaseStrategy':
                data = maxPurchaseStrategyData;
                break;
            default:
                throw `Unexpected id ${id}`;
        }
        return new Dygraph(document.getElementById(`graphDiv_${id}`)!, data, {
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
                const textXPosition = area.x + 10;
                const textYPosition =
                    finalValueY + 30 < area.h - 10
                        ? finalValueY + 30
                        : finalValueY - 20;
                canvas.fillText(
                    `Финална стойност: ${getFormattedByKey(
                        data[data.length - 1][1],
                        id
                    )}`,
                    textXPosition,
                    textYPosition
                );
            },
            axes: {
                y: {
                    valueFormatter: function (y) {
                        return getFormattedByKey(y, id);
                    },
                    axisLabelFormatter: function (y) {
                        return getFormattedByKey(y, id);
                    }
                }
            },
            ...partOfVisualizationConfig
        });
    });
}
function getFormattedByKey(toBeFormatted: number | Date, id: string) {
    if (typeof toBeFormatted != 'number') {
        return toBeFormatted.toString();
    }
    switch (id) {
        case 'Price':
        case 'moneyBalance':
        case 'totalValue':
        case 'maxPurchaseStrategy':
            return toBeFormatted.toFixed(2).toString();
        case 'assetCount':
            return toBeFormatted.toString();
        default:
            throw `Unexpected id ${id}`;
    }
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
    <h1>Цена на актив:</h1>
    <div id="graphDiv_Price"></div>
    <br />
    <h1>
        Пари+стойност на активите в алтернативната стратегия "купи всичко в
        началото":
    </h1>
    <div id="graphDiv_maxPurchaseStrategy"></div>
    <br />
    <h1>Пари+стойност на активите:</h1>
    <div id="graphDiv_totalValue"></div>
    <br />
    <br />
    <h1>Останали пари:</h1>
    <div id="graphDiv_moneyBalance"></div>
    <br />
    <h1>Брой на притежаваните активи:</h1>
    <div id="graphDiv_assetCount"></div>
    <br />
</template>

<style scoped>
.dygraph-axis-label-y {
    transform: translateX(10px);
}
</style>
