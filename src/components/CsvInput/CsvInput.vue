<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Papa from 'papaparse';
const file: Ref<null | any> = ref(null);
const parsing = ref(false);
const onFileChange = (e: any) => {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;

    file.value = files[0];
    parseCSV(file.value);
};

const parseCSV = (file: any) => {
    parsing.value = true;
    Papa.parse(file, {
        worker: true, // Enable web worker
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            file.value = results.data;
            parsing.value = false;
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
    <h1 v-if="parsing">Parsing...</h1>
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
