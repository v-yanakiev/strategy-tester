<script setup lang="ts">
import type { Cell } from '@maxgraph/core';
import { ref, type Ref } from 'vue';
import { leadsNowhere, isStart, isEnd, isEdge } from '@/common/nodeCalculator';
interface Props {
    markedNode: Cell | undefined;
}
let startNode: Ref<Cell | undefined> = ref(undefined);
let endNode: Ref<Cell | undefined> = ref(undefined);

const props = defineProps<Props>();
const emits = defineEmits(['startChosen', 'endChosen']);

function markPathStart() {
    startNode.value = props.markedNode;
    emits('startChosen', startNode.value);
}
function markPathEnd() {
    endNode.value = props.markedNode;
    emits('endChosen', endNode.value, '');
    startNode.value = undefined;
    endNode.value = undefined;
}
</script>
<template>
    <button
        @click="markPathEnd"
        v-if="startNode"
        :disabled="
            !markedNode ||
            markedNode == startNode ||
            isStart(markedNode) ||
            isEdge(markedNode)
        "
    >
        End path
    </button>
    <button
        @click="markPathStart()"
        v-else-if="leadsNowhere(props.markedNode)"
        :disabled="!markedNode || isEnd(markedNode) || isEdge(markedNode)"
    >
        Start path
    </button>
</template>
