import type { ParseResult } from 'papaparse';
import { defineStore } from 'pinia';
import { computed, ref, toRaw, type Ref } from 'vue';
import { Cell, Graph, type CellStyle, Geometry } from '@maxgraph/core';
import {
    NodeType,
    PathChosen,
    isCondition,
    isEnd,
    isStart
} from '@/common/nodeCalculator';
import { v4 as genId } from 'uuid';
export const useGraphStore = defineStore('graph', () => {
    const strategyCanBeGenerated = ref(false);
    const startNode = ref(null) as Ref<Cell | null>;
    const endNode = ref(null) as Ref<Cell | null>;
    const graph = ref(null) as Ref<Graph | null>;
    const hasBeenInteractedWith = ref(false);
    function addPath(
        startNode: Cell,
        endNode: Cell,
        value: keyof typeof PathChosen | ''
    ) {
        const edge = getGraph().insertEdge(
            getParent(),
            genId(),
            value,
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
            (a) => isStart(a) || a.getIncomingEdges().length
        );
        if (!allExceptStartHaveIncomingEdges) {
            return false;
        }
        const allExceptEndHaveOutgoingEdges = getAllVertices().every(
            (a) =>
                isEnd(a) ||
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
    function addIfBlock(
        statement: string,
        xCoordinate?: number,
        yCoordinate?: number
    ) {
        // let updatedStatement = statement.match(/.{1,50}/g)!.join('\n');
        const ifVertex = getGraph().insertVertex(
            getParent(),
            genId(),
            {
                value: statement,
                label: `if (${statement})`,
                type: NodeType.If
            },
            xCoordinate || 300,
            yCoordinate || 200,
            100,
            100,
            <CellStyle>{ deletable: true, fillColor: 'orange' }
        );
        refreshGraph();
        hasBeenInteractedWith.value = true;
        return toRaw(ifVertex);
    }
    function addStart() {
        setStartNode(
            getGraph().insertVertex(
                getParent(),
                genId(),
                {
                    value: 'Start',
                    label: `Начало`,
                    type: NodeType.Start
                },
                10,
                10,
                100,
                100,
                <CellStyle>{ deletable: true, fillColor: 'pink' }
            )
        );
    }
    function addEnd() {
        setEndNode(
            getGraph().insertVertex(
                getParent(),
                genId(),
                {
                    value: 'End',
                    label: `Край`,
                    type: NodeType.End
                },
                850,
                150,
                100,
                100,
                <CellStyle>{
                    deletable: true,
                    fillColor: 'pink'
                }
            )
        );
    }
    function addBuy(value: string) {
        const action = getGraph().insertVertex(
            getParent(),
            genId(),
            {
                value: Number(value),
                label: `Купи: ${value}`,
                type: NodeType.Buy
            },
            800,
            300,
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
        hasBeenInteractedWith.value = true;
        return toRaw(action);
    }
    function addSell(value: string) {
        const action = getGraph().insertVertex(
            getParent(),
            genId(),
            {
                value: Number(value),
                label: `Продай: ${value}`,
                type: NodeType.Sell
            },
            800,
            20,
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
        hasBeenInteractedWith.value = true;
        return toRaw(action);
    }
    function getAllConditions() {
        return getAllNodes().filter((a) => isCondition(a));
    }
    function getAllNodes() {
        return getParent().children;
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
        addStart,
        addEnd,
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
        addBuy,
        addSell,
        getAllConditions,
        hasBeenInteractedWith
    };
});
