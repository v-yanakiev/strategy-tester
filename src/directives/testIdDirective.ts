import type { DirectiveHook, ObjectDirective } from 'vue';

export class TestIdDirective implements ObjectDirective {
    beforeMount: DirectiveHook = (el, binding) => {
        if (import.meta.env.DEV) {
            el.setAttribute('id', binding.value);
        }
    };
}
