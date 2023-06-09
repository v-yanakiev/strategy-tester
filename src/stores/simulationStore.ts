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
    const startCutOffDateString = ref(null) as Ref<null | string>;
    const endCutOffDateString = ref(null) as Ref<null | string>;
    const moneyLeftAfterMaxPurchase = ref(0);
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
        moneyLeftAfterMaxPurchase,
        startCutOffDateString,
        endCutOffDateString
    };
});
