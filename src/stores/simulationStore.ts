import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
export const useSimulationStore = defineStore('simulation', () => {
    const dependentVariableName = ref(null) as Ref<null | string>;
    const dependentVariableInitialValue = ref(null) as Ref<any>;
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
        getDependentVariableInitialValue
    };
});
