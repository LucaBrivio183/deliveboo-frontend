<script>
//libraries
import axios from 'axios';
//function
import store from '../store';
//components
import RestaurantCard from '../components/RestaurantCard.vue';
import TypologiesList from '../components/TypologiesList.vue';
import JumbotronElement from '../components/JumbotronElement.vue';

export default {
    name: 'App',
    components: {
        RestaurantCard,
        TypologiesList,
        JumbotronElement
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
                    this.store.restaurants = response.data.results.data;
                })
        },
    },
    created() {
        this.getRestaurants(
            console.log(this.store.selectedTypologies)
        );
    }
}
</script>

<template>
    <main>
        <!-- Jumbotron -->
        <JumbotronElement />
        <!-- Typologies List -->
        <TypologiesList @getRestaurants="getRestaurants"/>
        <div class="container-md">
            <h1 class="my-3">Consegna nella zona:</h1>
            <div v-if="this.store.restaurants.length > 0" v-for="restaurant in store.restaurants">
                <!-- Restaurant Card -->
                <RestaurantCard :restaurant="restaurant" />
            </div>
            <div v-else class="row">
                <h3 class="my-3 ms-3">Nessun ristorante corrisponde alla ricerca</h3>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;

</style>
