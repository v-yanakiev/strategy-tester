<script setup lang="ts">
import { type CellStyle, Graph, InternalEvent, Cell } from '@maxgraph/core';
import { onMounted, ref, toRaw, type Ref } from 'vue';
import ConditionedAdd from './AddNewElement/ConditionedAdd.vue';
import AddCodeExecution from './AddNewElement/AddCodeExecution.vue';
import AddPath from './AddNewElement/AddPath.vue';
let graph: Graph;
let startNode: Cell;
let endNode: Cell;
const markedNode: Ref<Cell | undefined> = ref(undefined);
function getParent() {
    return graph.getDefaultParent!();
}
onMounted(() => {
    const container = <HTMLElement>document.getElementById('graph-container');
    // Disables the built-in context menu
    InternalEvent.disableContextMenu(container);
    graph = new Graph(container, undefined);
    graph.setPanning(true); // Use mouse right button for panning
    // Gets the default getParent() for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    attachDeleteFunctionality();
    attachNodeMarking();
    // Adds cells to the model in a single step
    graph.batchUpdate(() => {
        startNode = graph.insertVertex(
            getParent(),
            null,
            'Start',
            10,
            10,
            100,
            100,
            <CellStyle>{ deletable: true, fillColor: 'pink' }
        );
        endNode = graph.insertVertex(
            getParent(),
            null,
            'End',
            800,
            200,
            100,
            100,
            <CellStyle>{
                deletable: true,
                fillColor: 'pink'
            }
        );
    });
    refreshGraph();
});
function addIfBlock(statement: string) {
    const ifVertex = graph.insertVertex(
        getParent(),
        null,
        `If: ${statement}`,
        200,
        200,
        100,
        100,
        <CellStyle>{ deletable: true, fillColor: 'orange' }
    );
    refreshGraph();
}
function addWhileBlock(statement: string) {}
function addCodeExecution(statement: string) {
    const codeExecution = graph.insertVertex(
        getParent(),
        null,
        `Execute code: ${statement}`,
        250,
        250,
        100,
        100,
        <CellStyle>{
            deletable: true,
            fillColor: 'lightblue',
            whiteSpace: 'wrap',
            overflow: 'width',
            autosize: true
        }
    );

    refreshGraph();
}
function attachDeleteFunctionality() {
    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.key === 'Delete') {
            // Get the currently selected cells
            let selectedCells = graph.getSelectionCells();
            graph.removeCells(selectedCells);
            refreshGraph();
        }
    };
}
function addPath(startNode: Cell, endNode: Cell, text: string) {
    const edge = graph.insertEdge(
        getParent(),
        null,
        text,
        toRaw(startNode),
        toRaw(endNode)
    );
    refreshGraph();
}
function refreshGraph() {
    graph.refresh();
    getParent().children.forEach((cell) => graph.refresh(cell));
}
function attachNodeMarking() {
    document.onclick = function (evt) {
        evt = evt || window.event;
        let selectedCells = graph.getSelectionCells();
        markedNode.value = selectedCells[0];
    };
}
</script>

<template>
    <div class="elementCreators">
        <ConditionedAdd
            @finalized="addIfBlock"
            click-label="Add If"
            statement-label="If statement: "
        />
        <AddCodeExecution @finalized="addCodeExecution" />
        <AddPath :marked-node="markedNode" @pathCreated="addPath" />
    </div>
    <br />
    <div id="graph-container"></div>
</template>
<style scoped>
.elementCreators {
    display: flex;
    flex-direction: column;
}
#graph-container {
    background-color: white;
    width: 1000px;
    height: 400px;
    border-color: black;
    border-width: 1px;
    border: 2px solid black;
}
</style>
