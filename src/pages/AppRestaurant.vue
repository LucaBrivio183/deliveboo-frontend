<script>
import axios from 'axios';
import store from '../store';
import ProductCard from '../components/ProductCard.vue';
export default {
    name: 'AppRestaurant',
    components: {
        ProductCard
    },
    data() {
        return {
            store,
            restaurant: null,
            products: [],
        }
    },
    methods: {
        // Axios call to get a specified restaurant with its products
        getProject() {  
            axios.get(`${this.store.apiBaseUrl}${this.store.apiUrls.restaurant}/burger-king`)       //Todo: replace "burger-king" with /${this.$route.params.slug}
                .then((response) => {
                    this.restaurant = response.data.results;
                    this.products = response.data.results.products;
                });
        }
    },
    created() {
        this.getProject();
    }
}
</script>

<template>
    <!-- Restaurant menu -->
    <div class="ms-container py-5 px-3 mx-auto" v-if="restaurant">
        <!-- Restaurant name -->
        <h1 class="text-center">{{ restaurant.name }}</h1>
        <div class="row ms-row">
            <!-- Recall ProductCard component and cycle it for every product -->
            <div v-if="products" v-for="product in products" class="col-12 col-lg-6 col-xl-4 ms-col gy-4">
                <ProductCard :product="product"/>
            </div>
        </div>
    </div>
    <!-- /Restaurant menu -->
</template>

<style lang="scss">
    .ms-container {
        max-width: 90rem;
        // margin: 0 auto;

        .ms-row {
            // height: 100%;

            .ms-col {
                // height: 100%;
            }
        }
    }
</style>