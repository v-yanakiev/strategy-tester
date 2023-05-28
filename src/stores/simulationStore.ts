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
    const balance = ref(null) as Ref<null | number>;
    const state = ref(SimulationState.NotStarted);
    function setBalance(value: number) {
        balance.value = value;
    }
    function getBalance() {
        return balance.value;
    }
    return {
        setBalance,
        getBalance,
        state
    };
});
