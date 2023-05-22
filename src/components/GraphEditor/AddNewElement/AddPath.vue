<script setup lang="ts">
import { isCondition } from '@/common/nodeCalculator';
import type { Cell } from '@maxgraph/core';
import AddConditionalPath from './AddConditionalPath.vue';
import AddNormalPath from './AddNormalPath.vue';
import { ref, type Ref } from 'vue';
const emits = defineEmits(['pathCreated']);

interface Props {
    markedNode: Cell | undefined;
}
const props = defineProps<Props>();
let pathStart: Ref<Cell | undefined> = ref(undefined);
function setPathStart(node: Cell) {
    pathStart.value = node;
}
function setPathEnd(node: Cell, text: string) {
    emits('pathCreated', pathStart.value, node, text);
    pathStart.value = undefined;
}
</script>
<template>
    <AddConditionalPath
        v-if="
            (markedNode && isCondition(markedNode)) ||
            (pathStart && isCondition(pathStart))
        "
        :marked-node="markedNode"
        @start-chosen="setPathStart"
        @end-chosen="setPathEnd"
    />
    <AddNormalPath
        v-else
        :markedNode="markedNode"
        @start-chosen="setPathStart"
        @end-chosen="setPathEnd"
    />
</template>
