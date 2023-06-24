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
            indexes: [],
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
        },
        getindexes() {
            this.indexes = JSON.parse(localStorage.getItem('indexes'));
            // console.log(this.indexes);
            return this.indexes;
        },
        getProduct(index) {
            console.log(JSON.parse(localStorage.getItem(this.indexes[index])));
            return JSON.parse(localStorage.getItem(this.indexes[index]));
        },
        deleteItem(index) {
            localStorage.removeItem(this.indexes[index]);
            let tempIndexes = JSON.parse(localStorage.getItem('indexes'));
            tempIndexes.splice(index, 1);
            localStorage.setItem('indexes',
            JSON.stringify(tempIndexes));
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
                <ProductCard :product="product"
                             :restaurant="restaurant"
                             />
            </div>
        </div>
    </div>

    <div>
        <div v-for="(product, index) in getindexes()">
            <div v-if="getProduct(index)">
                <h2>{{getProduct(index).productName}}</h2>
                <div>{{ getProduct(index).quantity }}</div>
                <div>{{ getProduct(index).price }}</div>
            </div>
            <button class="btn btn-danger" @click="deleteItem(index)">Cancella</button>
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