import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GraphEditorView from '../views/GraphEditorView.vue';
import DataInput from '@/components/DataInput/DataInput.vue';
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
        { path: '/dataInput', name: 'dataInput', component: DataInput },
        {
            path: '/runSimulation',
            name: 'runSimulation',
            component: SimulationView
        }
    ]
});

export default router;
