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
        getProducts() {  
            axios.get(`${this.store.apiBaseUrl}${this.store.apiUrls.restaurant}/${this.$route.params.slug}`)       //Todo: replace "burger-king" with /${this.$route.params.slug}
                .then((response) => {
                    this.restaurant = response.data.results;
                    this.products = response.data.results.products;
                });
        }
    },
    created() {
        this.getProducts();
    }
}
</script>

<template>
    <!-- Restaurant menu -->
    <div class="container" v-if="restaurant">
        <!-- Restaurant name -->
        <h1 class="mt-5 mb-3">{{ restaurant.name }}</h1>
        <div class="row gy-2">
            <!-- Recall ProductCard component and cycle it for every product -->
            <div v-if="products" v-for="product in products" class="col-sm-12 col-md-6 col-lg-4">
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