import { createWebHistory, createRouter } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppRestaurant from './pages/AppRestaurant.vue';
import AppPayment from './pages/AppPayment.vue';
import store from './store';

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
            path: '/restaurant/:slug/payment',
            name: 'payment',
            component: AppPayment
        },
    ]
});

router.beforeEach((to, from, next) => {
    // Show the loader
    store.loading = true;
  
    // Continue with the navigation
    next();
  });
  
  router.afterEach(() => {
    // Hide the loader after the navigation is complete
   store.loading = false;
  });

export { router };