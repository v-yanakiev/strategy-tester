<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Papa from 'papaparse';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import SelectTimeVariable from '../VariableSelectors/SelectTimeVariable.vue';
import SelectPriceVariable from '../VariableSelectors/SelectPriceVariable.vue';
import SelectBalanceQuantity from '../VariableSelectors/SelectBalanceQuantity.vue';
import SelectCutOffDates from '../VariableSelectors/SelectCutOffDates.vue';
const parsedDataStore = useParsedDataStore();
const droppedFile: Ref<null | any> = ref(null);
const parsing = ref(false);
const onFileChange = (e: any) => {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;

    droppedFile.value = files[0];
    parseData(droppedFile.value);
};

const parseData = (file: any) => {
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
    <h1 v-test-id="'dataLoadInfo'">
        Тук можете да пуснете вашите данни във формат .csv:
    </h1>
    <div
        class="dropzone"
        @dragover.prevent="preventDefault"
        @dragenter.prevent="preventDefault"
        @drop.prevent="onFileChange"
    >
        Пуснете своя CSV файл тук.
        <input
            id="fileInput"
            type="file"
            @change="onFileChange"
            style="display: none"
        />
    </div>
    <h2 v-if="parsing">Обработване...</h2>
    <div v-else-if="parsedDataStore.fields">
        <h2>Данните бяха обработени успешно.</h2>
        <br />
        <SelectTimeVariable />
        <br />
        <SelectPriceVariable />
        <br />
        <SelectBalanceQuantity />
        <br />
        <SelectCutOffDates
            v-if="
                parsedDataStore.parsedData && parsedDataStore.timeVariableName
            "
        />
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
