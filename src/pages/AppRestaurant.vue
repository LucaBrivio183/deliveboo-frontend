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
            indexes: JSON.parse(localStorage.getItem('indexes')),
            potatoes: 3,
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
        // Save in store.indexes the indexes in local storage
        getIndexes() {
            if (JSON.parse(localStorage.getItem('indexes')) != null) {
                this.store.indexes = JSON.parse(localStorage.getItem('indexes'));
            }
        },
        // Get product name from local storage
        getProductName(index) {
            // console.log(JSON.parse(localStorage.getItem(this.store.indexes[index])));
            return JSON.parse(localStorage.getItem(this.store.indexes[index])).productName;
        },
        // Get product quantity from local storage
        getProductQuantity(index) {
            // console.log(JSON.parse(localStorage.getItem(this.store.indexes[index])));
            return JSON.parse(localStorage.getItem(this.store.indexes[index])).quantity;
        },
        // Get product price from local storage
        getProductPrice(index) {
            // console.log(JSON.parse(localStorage.getItem(this.store.indexes[index])));
            return JSON.parse(localStorage.getItem(this.store.indexes[index])).price;
        },
        // Add one item to an already existing product
        addQuantity(index) {
            console.log(this.products);
            let product = this.products.find(product => product.id === this.store.indexes[index]);
            console.log(product);
            localStorage.setItem(this.store.indexes[index],
                JSON.stringify({ productName: this.getProductName(index), quantity: this.getProductQuantity(index) + 1, price: Number(this.getProductPrice(index)) + Number(product.price) }));
        },
        // Subtract one item from an already existing product. Delete if quantity = 0
        subQuantity(index) {
            console.log(this.products);
            let product = this.products.find(product => product.id === this.store.indexes[index]);
            console.log(product);
            if (this.getProductQuantity(index) > 1) {
                localStorage.setItem(this.store.indexes[index],
                    JSON.stringify({ productName: this.getProductName(index), quantity: this.getProductQuantity(index) - 1, price: Number(this.getProductPrice(index)) - Number(product.price) }));
            } else {
                localStorage.removeItem(this.store.indexes[index]);
                // let tempIndexes = JSON.parse(localStorage.getItem('indexes'));
                this.store.indexes.splice(index, 1);
                localStorage.setItem('indexes',
                    JSON.stringify(this.store.indexes));
            }
        },
        // Delete product from local Storage.
        deleteItem(index) {
            localStorage.removeItem(this.store.indexes[index]);
            // let tempIndexes = JSON.parse(localStorage.getItem('indexes'));
            this.store.indexes.splice(index, 1);
            localStorage.setItem('indexes',
                JSON.stringify(this.store.indexes));
        },
    },
    computed: {
        getProduct(index) {
            console.log(JSON.parse(localStorage.getItem(this.store.indexes[index])));
            return JSON.parse(localStorage.getItem(this.store.indexes[index]));
        },
    },
    created() {
        this.getProducts();
        this.getIndexes();
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
                <ProductCard :product="product" :restaurant="restaurant" />
            </div>
        </div>
    </div>

    <div>
        <div v-for="(product, index) in store.indexes">
            <div>1</div>
            <div>{{ getProductName(index) }}</div>
            <div>{{ getProductQuantity(index) }}</div>
            <div>{{ getProductPrice(index) }} €</div>
            <div class="btn btn-primary" @click="subQuantity(index)">Remove item</div>
            <div class="btn btn-success" @click="addQuantity(index)">Add item</div>
            <div class="btn btn-danger" @click="deleteItem(index)">Delete item</div>
        </div>
    </div>

    <div>{{ potatoes }}</div>
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