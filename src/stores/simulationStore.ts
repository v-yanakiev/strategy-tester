import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
export enum SimulationState {
    NotStarted = 1,
    StartingCalculations = 2,
    InitialCalculationsFinished = 3,
    AllCalculationsFinished = 4,
    SimulatedTimeSeriesGenerated = 5
}
export const useSimulationStore = defineStore('simulation', () => {
    const priceVariableName = ref(null) as Ref<null | string>;
    const priceVariableInitialValue = ref(null) as Ref<any>;
    const state = ref(SimulationState.NotStarted);
    function setPriceVariableName(value: string) {
        priceVariableName.value = value;
    }
    function getPriceVariableName() {
        return priceVariableName.value;
    }
    function setPriceVariableInitialValue(value: any) {
        priceVariableInitialValue.value = value;
    }
    function getPriceVariableInitialValue() {
        return priceVariableInitialValue.value;
    }
    return {
        setPriceVariableName,
        getPriceVariableName,
        setPriceVariableInitialValue,
        getPriceVariableInitialValue,
        state
    };
});
