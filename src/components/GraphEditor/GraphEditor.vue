<script setup lang="ts">
import { type CellStyle, Graph, InternalEvent, Cell } from '@maxgraph/core';
import { onMounted, ref, type Ref } from 'vue';
import AddConnection from './AddNewElement/AddConnection.vue';
import ConditionedAdd from './AddNewElement/ConditionedAdd.vue';
import AddCodeExecution from './AddNewElement/AddCodeExecution.vue';
let graph: Graph;
let beginningVertex: Cell;
let endVertex: Cell;
function getParent() {
	return graph.getDefaultParent!();
}
onMounted(() => {
	const container = <HTMLElement>document.getElementById('graph-container');
	// Disables the built-in context menu
	InternalEvent.disableContextMenu(container);
	graph = new Graph(container, undefined,);
	graph.setPanning(true); // Use mouse right button for panning
	// Gets the default getParent() for inserting new cells. This
	// is normally the first child of the root (ie. layer 0).
	addDeleteFunctionality();
	// Adds cells to the model in a single step
	graph.batchUpdate(() => {
		beginningVertex = graph.insertVertex(getParent(), null, 'Start', 10, 10, 100, 100, <CellStyle>{ deletable: true, fillColor: 'pink' });
		endVertex = graph.insertVertex(getParent(), null, 'End', 400, 400, 100, 100, <CellStyle>{ deletable: true, fillColor: 'pink' });
	})
	console.log(graph.getDataModel());

})
function addIfBlock(statement: Ref<string>) {
	const ifVertex = graph.insertVertex(getParent(), null, `If: ${statement.value}`, 200, 200, 100, 100, <CellStyle>{ deletable: true, fillColor: 'orange' });
	const yesPath = graph.insertEdge(getParent(), null, 'Yes', ifVertex, endVertex);
	// const noPath = graph.insertEdge(getParent(), null, 'No', ifVertex, endVertex.value);
	// graph.refresh();
	getParent().children.forEach(cell => graph.refresh(cell))
}
function addWhileBlock(statement: string) {

}

function addDeleteFunctionality() {
	document.onkeydown = function (evt) {
		evt = evt || window.event;
		if (evt.key === 'Delete') {
			// Get the currently selected cells
			var selectedCells = graph.getSelectionCells();
			graph.removeCells(selectedCells);
			selectedCells.forEach(cell => graph.refresh(cell));
		}
	};

}
</script>

<template>
	<h1>This is the Graph Editor. You can design your own strategy here.</h1>
	<br />
	<div class="elementCreators">
		<ConditionedAdd @finalized="addIfBlock" click-label="Add If" statement-label="If statement: " />
		<ConditionedAdd @finalized="addWhileBlock" click-label="Add While" statement-label="While statement: " />
		<AddConnection />
		<AddCodeExecution />
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