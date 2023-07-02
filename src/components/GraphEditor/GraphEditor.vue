<script setup lang="ts">
import { type CellStyle, Graph, InternalEvent, Cell } from '@maxgraph/core';
import { onMounted, ref, toRaw, type Ref } from 'vue';
import ConditionedAdd from './AddNewElement/ConditionedAdd.vue';
import AddAction from './AddNewElement/AddAction.vue';
import AddPath from './AddNewElement/AddPath.vue';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { useGraphStore } from '@/stores/graphStore';
import CanSimulationBeRan from '../common/CanSimulationBeRan.vue';
import { isEdge, isEnd, isStart, isVertex } from '@/common/nodeCalculator';
import DeleteElement from './ActionsOnElement/DeleteElement.vue';
import ExampleStrategies from './ExampleStrategies.vue';
import GraphEditorInfo from './GraphEditorInfo.vue';
const markedElement: Ref<Cell | undefined> = ref(undefined);
const parsedDataStore = useParsedDataStore();
const graphStore = useGraphStore();
onMounted(() => {
    // throw 'test error!';
    const container = <HTMLElement>document.getElementById('graph-container');
    // Disables the built-in context menu
    InternalEvent.disableContextMenu(container);
    graphStore.setGraph(new Graph(container, undefined));
    graphStore.getGraph().setPanning(true);
    attachDeleteFunctionality();
    attachNodeMarking();
    attachValueLabelNonEquivalence();
    ensureEdgesCannotBeMovedAround();
    if (import.meta.env.DEV) {
        ensureIdsAppearInDOM();
    }
    graphStore.getGraph().batchUpdate(() => {
        graphStore.addStart();
        graphStore.addEnd();
    });
    graphStore.refreshGraph();
});
function attachValueLabelNonEquivalence() {
    graphStore.getGraph().convertValueToString = function (cell) {
        if (typeof cell.value === 'object') {
            return cell.value.label;
        }
        return cell.value;
    };
}
function ensureIdsAppearInDOM() {
    let originalRedrawLabel = graphStore
        .getGraph()
        .getCellRenderer().redrawLabel;

    graphStore.getGraph().getCellRenderer().redrawLabel = function (
        state,
        forced
    ) {
        originalRedrawLabel.call(this, state, forced);

        if (state.cell.id && state.text && state.text.node) {
            state.text.node.setAttribute('id', 'graphElement_' + state.cell.id);
        }
    };
}
function attachDeleteFunctionality() {
    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.key === 'Delete') {
            deleteSelectedCells();
        }
    };
}
function deleteSelectedCells() {
    // Get the currently selected cells
    let selectedCells = graphStore
        .getGraph()
        .getSelectionCells()
        .filter((cell) => !isStart(cell) && !isEnd(cell));
    const edges = selectedCells.flatMap((a) =>
        isVertex(a) ? a.getEdges() : []
    );
    selectedCells.push(...edges);

    graphStore.getGraph().removeCells(selectedCells);
    selectedCells.forEach((cell) => {
        graphStore.getGraph().refresh(cell);
    });
    graphStore.refreshGraph();
    markedElement.value = undefined;
}
function ensureEdgesCannotBeMovedAround() {
    graphStore.getGraph().setCellsDisconnectable(false);
}
function attachNodeMarking() {
    document.onclick = function (evt) {
        evt = evt || window.event;
        let selectedCells = graphStore.getGraph().getSelectionCells();
        markedElement.value = selectedCells[0];
    };
}
function loadStrategy(conditionYes: string, conditionNo?: string) {
    graphStore.getGraph().batchUpdate(() => {
        if (conditionNo) {
            const yesConditionIf = graphStore.addIfBlock(conditionYes);
            const noConditionIf = graphStore.addIfBlock(
                conditionNo,
                undefined,
                yesConditionIf.getGeometry()!.y - 250
            );
            const buyNode = graphStore.addBuy('1');
            const sellNode = graphStore.addSell('1');
            graphStore.addPath(graphStore.getStartNode(), yesConditionIf, '');
            graphStore.addPath(graphStore.getStartNode(), noConditionIf, '');
            graphStore.addPath(yesConditionIf, buyNode, 'True');
            graphStore.addPath(yesConditionIf, noConditionIf, 'False');
            graphStore.addPath(noConditionIf, sellNode, 'True');
            graphStore.addPath(noConditionIf, graphStore.getEndNode(), 'False');
            graphStore.addPath(buyNode, graphStore.getEndNode(), '');
            graphStore.addPath(sellNode, graphStore.getEndNode(), '');
        } else {
            const ifNode = graphStore.addIfBlock(conditionYes);
            const buyNode = graphStore.addBuy('1');
            const sellNode = graphStore.addSell('1');
            graphStore.addPath(graphStore.getStartNode(), ifNode, '');
            graphStore.addPath(ifNode, buyNode, 'True');
            graphStore.addPath(ifNode, sellNode, 'False');
            graphStore.addPath(buyNode, graphStore.getEndNode(), '');
            graphStore.addPath(sellNode, graphStore.getEndNode(), '');
        }
    });
    graphStore.refreshGraph();
}
</script>

<template>
    <CanSimulationBeRan> </CanSimulationBeRan>
    <div class="elementCreators">
        <ConditionedAdd
            @finalized="graphStore.addIfBlock"
            click-label="Добавете If блок"
            statement-label="if"
        />
        <AddAction
            test-id="buy"
            click-label="Добавете Действие - Купи"
            statement-label="Количество (брой, не валута) ="
            @finalized="graphStore.addBuy"
        />
        <AddAction
            test-id="sell"
            click-label="Добавете Действие - Продай"
            statement-label="Количество (брой, не валута) ="
            @finalized="graphStore.addSell"
        />
        <AddPath
            :marked-node="markedElement"
            @pathCreated="graphStore.addPath"
        />
        <DeleteElement
            :marked-element="markedElement"
            @delete-button-pressed="deleteSelectedCells"
        />
    </div>
    <br />
    <div id="graph-container"></div>
    <GraphEditorInfo />
    <ExampleStrategies
        @strategy-selected="loadStrategy"
        v-if="graphStore.interactionCount == 0"
    />
</template>
<style scoped>
.elementCreators {
    display: flex;
    flex-direction: column;
}
#graph-container {
    background-color: white;
    width: 1000px;
    height: 500px;
    border-color: black;
    border-width: 1px;
    border: 2px solid black;
}
</style>
