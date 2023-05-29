import type { ParseResult } from 'papaparse';
import { defineStore } from 'pinia';
import { computed, ref, toRaw, type Ref } from 'vue';
export const useParsedDataStore = defineStore('parsedData', () => {
    const parsedData = ref(null) as Ref<null | ParseResult<any>>;
    const timeVariableName = ref(null) as Ref<null | string>;
    const priceVariableName = ref(null) as Ref<null | string>;
    const fields = computed(() => {
        return parsedData.value?.meta.fields;
    });
    function setParsedData(parsedDataValue: any) {
        parsedData.value = parsedDataValue;
    }
    function getNonProxyParsedData() {
        return toRaw(parsedData.value);
    }

    return {
        getNonProxyParsedData,
        parsedData,
        timeVariableName,
        setParsedData,
        fields,
        priceVariableName
    };
});
