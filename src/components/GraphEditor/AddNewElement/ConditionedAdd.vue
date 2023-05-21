<script setup lang="ts">
import { ref } from 'vue';
interface Props {
    clickLabel: string;
    statementLabel: string;
}
const props = defineProps<Props>();
const emits = defineEmits(['finalized'])
const menuActivated = ref(false);
const statement = ref("");
const finalize = () => {
    menuActivated.value = false;
    emits("finalized", statement)
}
</script>
<template>
    <button v-if="!menuActivated" @click="menuActivated = true">{{ clickLabel }}</button>
    <div v-if="menuActivated">
        <label>{{ statementLabel }}</label>
        <input v-model="statement" />
        <button @click="finalize">Finalize</button>
    </div>
</template>