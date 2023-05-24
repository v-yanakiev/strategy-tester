import type { ParseResult } from 'papaparse';
import { defineStore } from 'pinia';
import { computed, ref, toRaw, type Ref } from 'vue';
import { Cell, Graph, type CellStyle } from '@maxgraph/core';
import { isCondition } from '@/common/nodeCalculator';
export const useGraphStore = defineStore('graph', () => {
    const allNodes = ref(null) as Ref<null | Cell[]>;
    const strategyCanBeGenerated = ref(false);
    const startNode = ref(null) as Ref<Cell | null>;
    const endNode = ref(null) as Ref<Cell | null>;
    const graph = ref(null) as Ref<Graph | null>;
    function addPath(startNode: Cell, endNode: Cell, text: string) {
        const edge = getGraph().insertEdge(
            getParent(),
            null,
            text,
            toRaw(startNode),
            toRaw(endNode)
        );
        refreshGraph();
        strategyCanBeGenerated.value = canAStrategyBeGenerated();
    }
    function getAllVertices() {
        return getParent().children.filter((a) => a.vertex);
    }
    function getParent() {
        return getGraph().getDefaultParent!();
    }
    function canAStrategyBeGenerated() {
        const startDoesNotLeadDirectlyToEnd =
            getStartNode().getOutgoingEdges()[0]?.target?.value !=
            endNode.value;
        if (!startDoesNotLeadDirectlyToEnd) {
            return false;
        }
        const allExceptStartHaveIncomingEdges = getAllVertices().every(
            (a) => a.value == 'Start' || a.getIncomingEdges().length
        );
        if (!allExceptStartHaveIncomingEdges) {
            return false;
        }
        const allExceptEndHaveOutgoingEdges = getAllVertices().every(
            (a) =>
                a.value == 'End' ||
                (!isCondition(a) && a.getOutgoingEdges().length == 1) ||
                a.getOutgoingEdges().length == 2
        );
        if (!allExceptEndHaveOutgoingEdges) {
            return false;
        }
        return true;
    }
    function refreshGraph() {
        getGraph().refresh();
        getParent().children.forEach((cell) => getGraph().refresh(cell));
    }
    function addIfBlock(statement: string) {
        const ifVertex = getGraph().insertVertex(
            getParent(),
            null,
            `if (${statement})`,
            200,
            200,
            100,
            100,
            <CellStyle>{ deletable: true, fillColor: 'orange' }
        );
        refreshGraph();
    }
    function addCodeExecution(statement: string) {
        const codeExecution = getGraph().insertVertex(
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
    function getAllNodes() {
        return toRaw(allNodes.value!);
    }
    function getStartNode() {
        return toRaw(startNode.value!);
    }
    function getEndNode() {
        return toRaw(endNode.value!);
    }
    function getGraph() {
        return toRaw(graph.value!);
    }
    function setGraph(value: Graph) {
        graph.value = value;
    }
    function setStartNode(value: Cell) {
        startNode.value = value;
    }
    function setEndNode(value: Cell) {
        endNode.value = value;
    }
    return {
        strategyCanBeGenerated,
        setStartNode,
        setEndNode,
        getAllNodes,
        getEndNode,
        getStartNode,
        getGraph,
        setGraph,
        addPath,
        getAllVertices,
        getParent,
        canAStrategyBeGenerated,
        refreshGraph,
        addIfBlock,
        addCodeExecution
    };
});
