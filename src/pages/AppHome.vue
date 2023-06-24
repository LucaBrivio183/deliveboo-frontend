<script>
//libraries
import axios from 'axios';
//function
import store from '../store';
//components
import RestaurantCard from '../components/RestaurantCard.vue';
import TypologiesList from '../components/TypologiesList.vue';

export default {
    name: 'App',
    components: {
        RestaurantCard,
        TypologiesList,
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
    <main>
        <TypologiesList @getRestaurants="getRestaurants" />
        <div class="container">
            <h1 class="mt-5 mb-3">Consegna nella zona:</h1>
            <div v-if="store.restaurants" v-for="restaurant in store.restaurants">
                <RestaurantCard :restaurant="restaurant" />
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;

main {
    /*
    background-image: url('/images/logo-green.png');
    background-repeat: no-repeat;
    background-size: 16%;
    background-position-y: 20%;
    background-position-x: right;
    */
}
</style>
