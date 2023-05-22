<script setup lang="ts">
import type { Cell } from '@maxgraph/core';
import { ref, type Ref } from 'vue';

interface Props {
    markedNode: Cell | undefined;
}
let startNode: Ref<Cell | undefined> = ref(undefined);
let endNode: Ref<Cell | undefined> = ref(undefined);

const props = defineProps<Props>();
const emits = defineEmits(['startChosen', 'endChosen']);

enum PathChosen {
    Yes = 1,
    No = 2
}
const pathChosen = ref(undefined) as Ref<undefined | PathChosen>;

function markPathStart(pathChosenSetting: PathChosen) {
    startNode.value = props.markedNode;
    pathChosen.value = pathChosenSetting;
    emits('startChosen', startNode.value);
}
function markPathEnd() {
    endNode.value = props.markedNode;
    emits('endChosen', endNode.value, pathChosen.value!.toString());
    startNode.value = undefined;
    endNode.value = undefined;
    pathChosen.value = undefined;
}
</script>
<template>
    <button
        @click="markPathEnd"
        v-if="startNode && pathChosen == PathChosen.Yes"
        :disabled="!markedNode || markedNode == startNode"
    >
        End Yes path
    </button>
    <button
        @click="markPathStart(PathChosen.Yes)"
        v-else-if="!pathChosen"
        :disabled="!markedNode"
    >
        Start Yes path
    </button>

    <button
        @click="markPathEnd"
        v-if="startNode && pathChosen == PathChosen.No"
        :disabled="!markedNode || markedNode == startNode"
    >
        End No path
    </button>
    <button
        @click="markPathStart(PathChosen.No)"
        v-else-if="!pathChosen"
        :disabled="!markedNode"
    >
        Start No path
    </button>
</template>
