import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
export enum SimulationState {
    NotStarted = 1,
    StartingCalculations = 2,
    InitialCalculationsFinished = 3,
    AllCalculationsFinished = 4
}
export const useSimulationStore = defineStore('simulation', () => {
    const initialBalance = ref(null) as Ref<null | number>;
    const state = ref(SimulationState.NotStarted);
    const moneyBalances: number[] = [];
    const quantitiesOfAssetInPossession: number[] = [];
    const maxQuantityThatCouldHaveBeenPurchasedInTheBeginning = ref(0);
    const startCutOffDate = ref(null) as Ref<null | Date>;
    const endCutOffDate = ref(null) as Ref<null | Date>;
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
        moneyBalances,
        quantitiesOfAssetInPossession,
        maxQuantityThatCouldHaveBeenPurchasedInTheBeginning,
        startCutOffDate,
        endCutOffDate
    };
});
