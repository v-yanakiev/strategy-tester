<script setup lang="ts">
import type { Cell } from '@maxgraph/core';
import { isStart, isEnd } from '../../../common/nodeCalculator';
interface Props {
    markedElement: Cell | undefined;
}
const props = defineProps<Props>();
const emits = defineEmits(['deleteButtonPressed']);
function deleteButtonPressed() {
    emits('deleteButtonPressed');
}
</script>
<template>
    <button
        v-if="markedElement && !isStart(markedElement) && !isEnd(markedElement)"
        @click="deleteButtonPressed"
    >
        Изтрий
    </button>
</template>
