<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Papa from 'papaparse';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import SelectTimeVariable from './SelectTimeVariable.vue';
import SelectPriceVariable from './SelectPriceVariable.vue';
const parsedDataStore = useParsedDataStore();
const droppedFile: Ref<null | any> = ref(null);
const parsing = ref(false);
const onFileChange = (e: any) => {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;

    droppedFile.value = files[0];
    parseCSV(droppedFile.value);
};

const parseCSV = (file: any) => {
    parsing.value = true;
    Papa.parse(file, {
        worker: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            parsing.value = false;
            parsedDataStore.parsedData = results;
        },
        error: function (err) {
            console.error(err);
        }
    });
};
const preventDefault = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
};
</script>

<template>
    <h1>Here you can drag and drop your time series CSV:</h1>
    <div
        class="dropzone"
        @dragover.prevent="preventDefault"
        @dragenter.prevent="preventDefault"
        @drop.prevent="onFileChange"
    >
        Drop your CSV file here
    </div>
    <h2 v-if="parsing">Parsing...</h2>
    <div v-else-if="parsedDataStore.fields">
        <h2>Data parsed successfully.</h2>
        <br />
        <SelectTimeVariable :field-names="parsedDataStore.fields" />
        <br />
        <SelectPriceVariable />
    </div>
</template>

<style scoped>
.dropzone {
    border: 2px dashed #ccc;
    border-radius: 10px;
    padding: 30px;
    text-align: center;
    margin: 10px;
}
</style>
