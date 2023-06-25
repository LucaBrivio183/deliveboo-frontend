<script>
import axios from 'axios';
import store from '../store';
import ProductCard from '../components/ProductCard.vue';
import ProductsCart from '../components/ProductsCart.vue';
export default {
    name: 'AppRestaurant',
    components: {
        ProductCard,
        ProductsCart,
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
    <!-- restaurant image -->
    <div class="restaurant-image">
        <img src="https://picsum.photos/900/500" alt="restaurant" class="w-100">
    </div>
    <!-- /restaurant image -->
    <!-- restaurant details -->
    <div id="restaurant-details" class="p-4" style="width: 27.5rem;">
        <div class="card-body d-flex flex-column align-items-center">
            <h2 class="mt-2 mb-3 fw-bold">{{ restaurant.name }}</h2>
            <p class="my-1">{{ restaurant.address }}, {{ restaurant.city }}, {{ restaurant.postal_code }}.</p>
            <p class="my-1">Orari di apertura: {{ restaurant.business_times }}</p>
            <p class="my-1">Tel: {{ restaurant.phone_number }}</p>
            <p class="highlight my-1 px-3 py-1 rounded text-light">Costo di consegna € {{ restaurant.delivery_cost }}</p>
            <p class="highlight my-1 px-3 py-1 rounded text-light">Spesa minima € {{ restaurant.min_purchase }}</p>
        </div>
    </div>
    <!-- /restaurant details -->
    <!-- Restaurant menu -->
    <div class="container" v-if="restaurant">
        <div class="row">
            <div class="col-9 row gy-2">
                <!-- Recall ProductCard component and cycle it for every product -->
                <div v-if="products" v-for="product in products" class="col-sm-12 col-md-6 col-lg-4">
                    <ProductCard :product="product" />
                </div>
            </div>
            <div class="col-3 my-5">
                <ProductsCart />
            </div>
        </div>
    </div>
    <!-- /Restaurant menu -->
</template>

<style lang="scss">
@use '../assets/scss/_partials/variables' as *;

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

.restaurant-image {
    max-height: 21.875rem;
    overflow-y: hidden;
}

#restaurant-details {
    border: 3px solid #f0f3f4;
    border-radius: 20px;
    position: relative;
    top: -7.5rem;
    margin: auto;
    background-color: $ms_secondary_color_light;

    .highlight {
        background-color: $ms_secondary_color;
    }
}
</style>