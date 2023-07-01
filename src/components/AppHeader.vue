<script>
// logo element
import LogoElement from './LogoElement.vue';
import store from '../store';

export default {
    name: 'AppHeader',
    components: {
        LogoElement,
    },
    data() {
        return {
            store,
            restaurants: [],
            restaurant: [],
        }
    },
    methods: {
        getOrdersNumber() {
            // if (JSON.parse(localStorage.getItem('indexes')) != null) {
            //     this.store.indexes = JSON.parse(localStorage.getItem('indexes'));
            // }
            return this.store.indexes.length;
        },
        getRestaurantSlug() {
            return localStorage.getItem('slug');
        }
    },
}
</script>

<template>
    <header>
        <!-- nav -->
        <nav id="nav" class="navbar navbar-expand-md navbar-light shadow-sm">
            <div class="container">
                <!-- toggle -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="toggle">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <!-- /toggle -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item mx-1">
                            <!-- home -->
                            <router-link :to="{ name: 'home' }" class="nav-link">
                                Home
                            </router-link>
                        </li>
                    </ul>
                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto align-items-center">
                        <li class="me-4" v-if="this.store.indexes.length !== 0">
                            <router-link :to="{ name: 'restaurant', params: { slug: getRestaurantSlug() } }" >
                                <div class="cart-header-image">
                                    <img src="/images/cart.png" alt="cart" class="cart-header-logo h-100">
                                    <div class="orders-number">
                                        {{ getOrdersNumber() }}
                                    </div>
                                </div>
                            </router-link>
                        </li>
                        <!-- authentication -->
                        <li class="nav-item">
                            <a href="http://127.0.0.1:8000/" class="nav-link">
                                <i class="fa-solid fa-utensils"></i>
                                Accedi o registrati</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- /nav -->
    </header>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
@use '../assets/scss/_partials/variables' as *;

header {
    position: sticky;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
    #nav{
        background-color: $ms_secondary_color_light;
        border-bottom: 2px solid $ms_primary_background;
        color: $ms_secondary_color;

        a:hover {
            color: $ms_primary_background;
        }

        .cart-header-image {
            height: 1.875rem;
            position: relative;

            .cart-header-logo {
                padding-bottom: .125rem;
                color: $ms-secondary-color;
            }

            .orders-number {
                position: absolute;
                top: -0.5rem;
                right: -0.9375rem;
                color: #fff;
                background-color: $ms-primary-color;
                border-radius: 50%;
                height: 13px;
                width: 13px;
                text-align: center;
                line-height: 15px;
                font-size: .625rem;
            }
        }
    }
}
</style>