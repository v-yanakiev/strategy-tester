<script setup lang="ts">
import { type CellStyle, Graph, InternalEvent, Cell } from '@maxgraph/core';
import { onMounted, ref, type Ref } from 'vue';
import AddConnection from './AddNewElement/AddConnection.vue';
import ConditionedAdd from './AddNewElement/ConditionedAdd.vue';
const graph = ref<Graph>();
function getGraph() {
    return graph.value!;
}
function getParent() {
    return getGraph().getDefaultParent!();
}
onMounted(() => {
    const container = <HTMLElement>document.getElementById('graph-container');
    // Disables the built-in context menu
    InternalEvent.disableContextMenu(container);
    graph.value = new Graph(container, undefined,);
    getGraph().setPanning(true); // Use mouse right button for panning
    // // Gets the default getParent() for inserting new cells. This
    // // is normally the first child of the root (ie. layer 0).

    // Adds cells to the model in a single step
    getGraph().batchUpdate(() => {
        const vertex01 = getGraph().insertVertex(getParent(), null, 'a regular rectangle', 10, 10, 100, 100, <CellStyle>{ deletable: true });
        const vertex02 = getGraph().insertVertex(getParent(), null, 'a regular ellipse', 350, 90, 50, 50, <CellStyle>{ shape: 'ellipse', fillColor: 'orange' });
        const edge = getGraph().insertEdge(getParent(), null, 'a regular edge', vertex01, vertex02);
        console.log(vertex01)
    })
    console.log(getGraph().getDataModel());

})
function addIfBlock(statement: Ref<string>) {
    const ifVertex = getGraph().insertVertex(getParent(), null, `If: ${statement.value}`, 10, 10, 200, 200, <CellStyle>{ deletable: true, shape: 'rhombus', fillColor: 'orange' });
}
function addWhileBlock(statement: string) {

}
document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.key === 'Delete') {
        // Get the currently selected cells
        var selectedCells = getGraph().getSelectionCells();
        getGraph().removeCells(selectedCells);
        // selectedCells.forEach(cell => { cell.removeFromParent(); cell.visible = false; cell.parent.re })
        selectedCells.forEach(cell => getGraph().refresh(cell))
        // Delete the selected cells
    }
};

</script>

<template>
    <h1>This is the Graph Editor. You can design your own strategy here.</h1>
    <br />
    <div class="elementCreators">
        <ConditionedAdd @finalized="addIfBlock" click-label="Add If" statement-label="If statement: " />
        <ConditionedAdd @finalized="addWhileBlock" click-label="Add While" statement-label="While statement: " />
        <AddConnection />
    </div>
    <br />
    <div id="graph-container" style="background-color:white;"></div>
</template>
<style scoped>
.elementCreators {
    display: flex;
    flex-direction: column;
    ;
}
</style>