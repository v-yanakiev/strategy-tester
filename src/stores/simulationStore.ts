import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
export enum SimulationState {
    NotStarted = 1,
    InitialCalculationsFinished = 2,
    AllCalculationsFinished = 3,
    SimulatedTimeSeriesGenerated = 4
}
export const useSimulationStore = defineStore('simulation', () => {
    const dependentVariableName = ref(null) as Ref<null | string>;
    const dependentVariableInitialValue = ref(null) as Ref<any>;
    const state = ref(SimulationState.NotStarted);
    function setDependentVariableName(value: string) {
        dependentVariableName.value = value;
    }
    function getDependentVariableName() {
        return dependentVariableName.value;
    }
    function setDependentVariableInitialValue(value: any) {
        dependentVariableInitialValue.value = value;
    }
    function getDependentVariableInitialValue() {
        return dependentVariableInitialValue.value;
    }
    return {
        setDependentVariableName,
        getDependentVariableName,
        setDependentVariableInitialValue,
        getDependentVariableInitialValue,
        state
    };
});
