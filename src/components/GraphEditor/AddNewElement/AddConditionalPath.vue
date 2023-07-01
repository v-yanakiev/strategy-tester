<script setup lang="ts">
import type { Cell } from '@maxgraph/core';
import { ref, type Ref } from 'vue';
import { isEdge, isStart, PathChosen } from '@/common/nodeCalculator';
interface Props {
    markedNode: Cell | undefined;
}
let startNode: Ref<Cell | undefined> = ref(undefined);
let endNode: Ref<Cell | undefined> = ref(undefined);

const props = defineProps<Props>();
const emits = defineEmits(['startChosen', 'endChosen']);

const pathChosen = ref(undefined) as Ref<undefined | PathChosen>;

function markPathStart(pathChosenSetting: PathChosen) {
    startNode.value = props.markedNode;
    pathChosen.value = pathChosenSetting;
    emits('startChosen', startNode.value);
}
function markPathEnd() {
    endNode.value = props.markedNode;
    emits('endChosen', endNode.value, PathChosen[pathChosen.value!]);
    startNode.value = undefined;
    endNode.value = undefined;
    pathChosen.value = undefined;
}
function truePathAlreadySelected() {
    return props.markedNode
        ?.getOutgoingEdges()
        .some((a) => a.value == PathChosen[PathChosen.True]);
}
function falsePathAlreadySelected() {
    return props.markedNode
        ?.getOutgoingEdges()
        .some((a) => a.value == PathChosen[PathChosen.False]);
}
</script>
<template>
    <button
        @click="markPathEnd"
        v-if="startNode && pathChosen == PathChosen.True"
        :disabled="
            !markedNode ||
            markedNode == startNode ||
            isStart(markedNode) ||
            isEdge(markedNode)
        "
        v-test-id="'endPathTrue'"
    >
        Завършете път - True
    </button>
    <button
        @click="markPathStart(PathChosen.True)"
        v-else-if="!pathChosen && !truePathAlreadySelected()"
        :disabled="!markedNode"
        v-test-id="'startPathTrue'"
    >
        Стартирайте път - True
    </button>

    <button
        @click="markPathEnd"
        v-if="startNode && pathChosen == PathChosen.False"
        :disabled="
            !markedNode || markedNode == startNode || isStart(markedNode)
        "
        v-test-id="'endPathFalse'"
    >
        Завършете път - False
    </button>
    <button
        @click="markPathStart(PathChosen.False)"
        v-else-if="!pathChosen && !falsePathAlreadySelected()"
        :disabled="!markedNode"
        v-test-id="'startPathFalse'"
    >
        Стартирайте път - False
    </button>
</template>
