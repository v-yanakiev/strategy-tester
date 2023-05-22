<script setup lang="ts">
import type { Cell } from '@maxgraph/core';
import { ref, type Ref } from 'vue';

interface Props {
    markedNode: Cell | undefined;
}
let beginningNode: Ref<Cell | undefined> = ref(undefined);
let endNode: Ref<Cell | undefined> = ref(undefined);

const props = defineProps<Props>();
const emits = defineEmits(['finalized']);
function finalize() {
    emits("finalized", beginningNode.value, endNode.value)
    beginningNode.value = undefined;
    endNode.value = undefined;
}
function markPathBeginning() {
    beginningNode.value = props.markedNode;
}
function markPathEnd() {
    endNode.value = props.markedNode;
}
</script>
<template>
    <button @click="finalize" v-if="endNode">Create path</button>
    <button @click="markPathEnd" v-else-if="beginningNode" :disabled="!markedNode || markedNode == beginningNode">
        End path
    </button>
    <button @click="markPathBeginning" v-else :disabled="!markedNode">Start path</button>
</template>