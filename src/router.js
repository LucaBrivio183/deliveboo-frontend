import { createWebHistory, createRouter } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppRestaurant from './pages/AppRestaurant.vue';
import AppPayment from './pages/AppPayment.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [

        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/restaurant/:slug',
            name: 'restaurant',
            component: AppRestaurant
        },
        {
            path: '/payment',
            name: 'payment',
            component: AppPayment
        },
    ]
});

export { router };