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
enum PathChosen {
    Yes, No
}
const pathChosen = ref(undefined) as Ref<undefined | PathChosen>;

function finalize() {
    emits("finalized", beginningNode.value, endNode.value)
    beginningNode.value = undefined;
    endNode.value = undefined;
    pathChosen.value = undefined;
}
function markPathBeginning(selectedPathChosen?: PathChosen) {
    beginningNode.value = props.markedNode;
    pathChosen.value = selectedPathChosen;
}
function markPathEnd() {
    endNode.value = props.markedNode;
    finalize();
}
function nodeIsConditionalNode() {
    return (props.markedNode?.value as string | undefined)?.startsWith("If");
}
</script>
<template>
    <button @click="markPathEnd" v-if="beginningNode && pathChosen == PathChosen.Yes"
        :disabled="!markedNode || markedNode == beginningNode">
        End Yes path
    </button>
    <button @click="markPathBeginning(PathChosen.Yes)" v-else-if="!pathChosen" :disabled="!markedNode">
        Start Yes path
    </button>

    <button @click="markPathEnd" v-if="beginningNode && pathChosen == PathChosen.No" :disabled="!markedNode ||
        markedNode == beginningNode">
        End No path
    </button>
    <button @click="markPathBeginning(PathChosen.No)" v-else-if="!pathChosen" :disabled="!markedNode">
        Start No path
    </button>
</template>