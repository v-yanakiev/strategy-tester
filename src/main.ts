import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { TestIdDirective } from './directives/testIdDirective';
const app = createApp(App);
app.directive('test-id', new TestIdDirective());
app.use(router);
app.use(createPinia());
app.mount('#app');
