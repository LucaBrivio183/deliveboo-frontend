<script>
//libraries
import axios from 'axios';
//function
import store from '../store';
//components
import RestaurantCard from '../components/RestaurantCard.vue';
export default {
    name: 'App',
    components: {
        RestaurantCard
    },
    data() {
        return {
            store,
            restaurants: [],
        }
    },
    methods: {
        getRestaurants() {
            axios.get(this.store.apiBaseUrl + this.store.apiUrls.homepage)
                .then((response) => {
                    console.log(response.data.results.data);
                    this.restaurants = response.data.results.data;       
                })
        }
    },
    created() {
        this.getRestaurants();
    }
}
</script>

<template>
    <main>
        <div class="container">
            <h1 class="mt-5 mb-3">Scelti per te</h1>
            <div class="row gy-2">
                <div class="col-sm-12 col-md-6 col-lg-4" v-if="restaurants" v-for="restaurant in restaurants">
                    <RestaurantCard :restaurant="restaurant"/>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
</style>
