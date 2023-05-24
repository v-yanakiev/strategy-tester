import type { ParseResult } from 'papaparse';
import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';
export const useParsedDataStore = defineStore('parsedData', () => {
    const parsedData = ref(null) as Ref<null | ParseResult<any>>;
    const timeVariable = ref(null) as Ref<null | string>;
    const fields = computed(() => {
        return parsedData.value?.meta.fields;
    });
    function setParsedData(parsedDataValue: any) {
        parsedData.value = parsedDataValue;
    }
    function setTimeVariable(timeVariableValue: string) {
        timeVariable.value = timeVariableValue;
    }
    return {
        parsedData,
        timeVariable,
        setTimeVariable,
        setParsedData,
        fields
    };
});
