<script>
//libraries
import axios from 'axios';
//function
import store from '../store';
//components
import RestaurantCard from '../components/RestaurantCard.vue';
import AppSidebar from '../components/AppSidebar.vue';
export default {
    name: 'App',
    components: {
        RestaurantCard,
        AppSidebar
    },
    data() {
        return {
            store,
        }
    },
    methods: {
        getRestaurants() {
            axios.get(this.store.apiBaseUrl + this.store.apiUrls.homepage,
                {
                    params: this.store.selectedTypologies
                })
                .then((response) => {
                    console.log(this.store.selectedTypologies);
                    this.store.restaurants = response.data.results.data;
                })
        },
    },
    created() {
        this.getRestaurants();
    }
}
</script>

<template>
    <main class="d-flex">
        <AppSidebar @getRestaurants="getRestaurants" />
        <div class="container flex-grow-1">
            <h1 class="mt-5 mb-3">Scelti per te</h1>
            <div class="row gy-2">
                <div class="col-sm-12 col-md-6 col-lg-4" v-if="store.restaurants" v-for="restaurant in store.restaurants">
                    <RestaurantCard :restaurant="restaurant" />
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;

main {
    background-image: url('/images/logo-green.png');
    background-repeat: no-repeat;
    background-size: 16%;
    background-position-y: 20%;
    background-position-x: right;
}
</style>
