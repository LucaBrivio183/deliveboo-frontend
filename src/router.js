import { createWebHistory, createRouter } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppRestaurant from './pages/AppRestaurant.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [

        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/restaurant',
            name: 'restaurant',
            component: AppRestaurant
        },
    ]
});

export { router };