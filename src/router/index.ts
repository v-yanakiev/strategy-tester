import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GraphEditorView from '../views/GraphEditorView.vue';
import CsvInputVue from '@/components/CsvInput/CsvInput.vue';
import SimulationView from '@/components/RunSimulation/SimulationView.vue';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/graphEditor',
            name: 'graphEditor',
            component: GraphEditorView
        },
        { path: '/csvInput', name: 'csvInput', component: CsvInputVue },
        {
            path: '/runSimulation',
            name: 'runSimulation',
            component: SimulationView
        }
    ]
});

export default router;
