import type { ParseResult } from 'papaparse';
import { defineStore } from 'pinia';
export const useParsedDataStore = defineStore('parsedData', {
    state: () => {
        return {
            parsedData: null as null | ParseResult<any>,
            timeVariable: null as string | null
        };
    },
    actions: {
        setParsedData(parsedData: any) {
            this.parsedData = parsedData;
        },
        setTimeVariable(timeVariable: string) {
            this.timeVariable = timeVariable;
        }
    },
    getters: {
        fields: (state) => {
            return state.parsedData?.meta.fields;
        }
    }
});
