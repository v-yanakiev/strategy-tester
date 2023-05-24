import { defineStore } from 'pinia';
export const useParsedDataStore = defineStore('parsedData', {
    state: () => {
        return { parsedData: null as any };
    },
    actions: {
        setParsedData(parsedData: any) {
            this.parsedData = parsedData;
        }
    },
    getters: {}
});
