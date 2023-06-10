import type { ParseResult } from 'papaparse';
import { defineStore } from 'pinia';
import { computed, ref, toRaw, type Ref } from 'vue';
import { useSimulationStore } from './simulationStore';
export const useParsedDataStore = defineStore('parsedData', () => {
    const parsedData = ref(null) as Ref<null | ParseResult<any>>;
    const timeVariableName = ref(null) as Ref<null | string>;
    const priceVariableName = ref(null) as Ref<null | string>;
    const fields = computed(() => {
        return parsedData.value?.meta.fields;
    });
    const simulationStore = useSimulationStore();

    const filteredData = computed(() => {
        if (!parsedData.value || !timeVariableName.value) {
            throw 'You should set time variable name before filtering data.';
        }
        const startCutOffDate = simulationStore.startCutOffDate
            ? new Date(simulationStore.startCutOffDate)
            : null;
        const endCutOffDate = simulationStore.endCutOffDate
            ? new Date(simulationStore.endCutOffDate)
            : null;
        return parsedData.value.data.filter((value) => {
            if (!timeVariableName.value) {
                throw 'You should set time variable name before filtering data.';
            }
            if (
                (startCutOffDate &&
                    startCutOffDate >
                        new Date(value[timeVariableName.value])) ||
                (endCutOffDate &&
                    endCutOffDate < new Date(value[timeVariableName.value!]))
            ) {
                return false;
            }
            return true;
        });
    });
    function setParsedData(parsedDataValue: any) {
        parsedData.value = parsedDataValue;
    }
    function getNonProxyParsedData() {
        return toRaw(filteredData.value);
    }

    return {
        getNonProxyParsedData,
        parsedData,
        timeVariableName,
        setParsedData,
        fields,
        priceVariableName,
        filteredData
    };
});
