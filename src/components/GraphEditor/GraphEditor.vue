<script setup lang="ts">
import { type CellStyle, Graph, InternalEvent, Cell } from '@maxgraph/core';
import { onMounted, ref, toRaw, type Ref } from 'vue';
import ConditionedAdd from './AddNewElement/ConditionedAdd.vue';
import AddCodeExecution from './AddNewElement/AddCodeExecution.vue';
import AddPath from './AddNewElement/AddPath.vue';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { useGraphStore } from '@/stores/graphStore';
import CanSimulationBeRan from '../common/CanSimulationBeRan.vue';
const markedNode: Ref<Cell | undefined> = ref(undefined);
const parsedDataStore = useParsedDataStore();

const graphStore = useGraphStore();
onMounted(() => {
    const container = <HTMLElement>document.getElementById('graph-container');
    // Disables the built-in context menu
    InternalEvent.disableContextMenu(container);
    graphStore.setGraph(new Graph(container, undefined));
    graphStore.getGraph().setPanning(true); // Use mouse right button for panning
    // Gets the default getParent() for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    attachDeleteFunctionality();
    attachNodeMarking();
    // Adds cells to the model in a single step
    graphStore.getGraph().batchUpdate(() => {
        graphStore.setStartNode(
            graphStore
                .getGraph()
                .insertVertex(
                    graphStore.getParent(),
                    null,
                    'Start',
                    10,
                    10,
                    100,
                    100,
                    <CellStyle>{ deletable: true, fillColor: 'pink' }
                )
        );
        graphStore.setEndNode(
            graphStore
                .getGraph()
                .insertVertex(
                    graphStore.getParent(),
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
                )
        );
    });
    graphStore.refreshGraph();
});

function attachDeleteFunctionality() {
    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.key === 'Delete') {
            // Get the currently selected cells
            let selectedCells = graphStore.getGraph().getSelectionCells();
            graphStore.getGraph().removeCells(selectedCells);
            graphStore.refreshGraph();
        }
    };
}

function attachNodeMarking() {
    document.onclick = function (evt) {
        evt = evt || window.event;
        let selectedCells = graphStore.getGraph().getSelectionCells();
        markedNode.value = selectedCells[0];
    };
}
</script>

<template>
    <CanSimulationBeRan> </CanSimulationBeRan>
    <div class="elementCreators">
        <ConditionedAdd
            @finalized="graphStore.addIfBlock"
            click-label="Add If"
            statement-label="if"
        />
        <AddCodeExecution @finalized="graphStore.addCodeExecution" />
        <AddPath :marked-node="markedNode" @pathCreated="graphStore.addPath" />
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
