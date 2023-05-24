<script setup lang="ts">
import { useGraphStore } from '@/stores/graphStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { onMounted } from 'vue';
const emits = defineEmits(['calculated']);
const parsedDataStore = useParsedDataStore();
const graphStore = useGraphStore();
onMounted(() => {
    emits(
        'calculated',
        parsedDataStore.parsedData && graphStore.strategyCanBeGenerated
    );
});
</script>
<template>
    <h2 v-if="!parsedDataStore.parsedData">You haven't loaded data yet.</h2>
    <h2 v-else-if="!graphStore.strategyCanBeGenerated">
        The graph is not valid.
    </h2>
    <h2 v-else>You can run the simulation!</h2>
</template>
