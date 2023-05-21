<script setup lang="ts">
import { type CellStyle, Graph, InternalEvent } from '@maxgraph/core';
import { onMounted } from 'vue';
import AddConnection from './AddNewElement/AddConnection.vue';
import ConditionedAdd from './AddNewElement/ConditionedAdd.vue';
onMounted(() => {
    const container = <HTMLElement>document.getElementById('graph-container');
    // Disables the built-in context menu
    InternalEvent.disableContextMenu(container);
    const graph = new Graph(container);
    graph.setPanning(true); // Use mouse right button for panning
    // // Gets the default parent for inserting new cells. This
    // // is normally the first child of the root (ie. layer 0).
    const parent = graph.getDefaultParent();

    // Adds cells to the model in a single step
    graph.batchUpdate(() => {
        const vertex01 = graph.insertVertex(parent, null, 'a regular rectangle', 10, 10, 100, 100);
        const vertex02 = graph.insertVertex(parent, null, 'a regular ellipse', 350, 90, 50, 50, <CellStyle>{ shape: 'ellipse', fillColor: 'orange' });
        graph.insertEdge(parent, null, 'a regular edge', vertex01, vertex02);
        console.log(vertex01)
    })
    console.log(graph.getDataModel());

})
function addIfBlock(statement: string) {

}
function addWhileBlock(statement: string) {

}
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