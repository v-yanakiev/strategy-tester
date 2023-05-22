<script setup lang="ts">
import type { Cell } from '@maxgraph/core';

interface Props {
    markedNode?: Cell;
}
let beginningNode: Cell | undefined;
let endNode: Cell | undefined;

const props = defineProps<Props>();
const emits = defineEmits(['finalized']);
function finalize() {
    emits("finalized", { beginningNode, endNode })
}
function markPathBeginning() {
    beginningNode = props.markedNode;
}
function markPathEnd() {
    endNode = props.markedNode;
}
</script>
<template>
    <button @click="finalize" v-if="endNode" :disabled="!markedNode">Create path</button>
    <button @click="markPathEnd" v-else-if="beginningNode" :disabled="!markedNode">End path</button>
    <button @click="markPathBeginning" v-else :disabled="!markedNode">Start path</button>
</template>