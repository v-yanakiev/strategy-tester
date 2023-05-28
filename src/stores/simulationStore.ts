import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
export enum SimulationState {
    NotStarted = 1,
    StartingCalculations = 2,
    InitialCalculationsFinished = 3,
    AllCalculationsFinished = 4,
    TimeSeriesGenerated = 5
}
export const useSimulationStore = defineStore('simulation', () => {
    const initialBalance = ref(null) as Ref<null | number>;
    const state = ref(SimulationState.NotStarted);
    const balances: number[] = [];
    function setInitialBalance(value: number) {
        initialBalance.value = value;
    }
    function getInitialBalance() {
        return initialBalance.value;
    }
    return {
        setInitialBalance,
        getInitialBalance,
        state,
        balances
    };
});
