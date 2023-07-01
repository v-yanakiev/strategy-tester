<script setup lang="ts">
import { ref } from 'vue';
interface Props {
    clickLabel: string;
    statementLabel: string;
    testId: string;
}
const props = defineProps<Props>();
const emits = defineEmits(['finalized']);
const menuActivated = ref(false);
const action = ref('');
const finalize = () => {
    menuActivated.value = false;
    emits('finalized', action.value);
};
</script>
<template>
    <button
        v-test-id="`${testId}AddButton`"
        v-if="!menuActivated"
        @click="menuActivated = true"
    >
        {{ clickLabel }}
    </button>
    <div v-if="menuActivated">
        <label>{{ statementLabel }} (</label>
        <input v-model="action" v-test-id="`${testId}ActionInput`" />
        <label>) </label>
        <button @click="finalize" v-test-id="`${testId}FinalizeButton`">
            Добави
        </button>
    </div>
</template>
