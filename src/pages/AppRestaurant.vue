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
    <!-- /RESTAURANT DESCRIPTION -->

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

    <!-- /RESTAURANT DESCRIPTION -->

    <!-- Restaurant menu -->
    <div class="container" v-if="restaurant">

        <div class="row">
            <div class="col-7">
                <!-- Recall ProductCard component and cycle it for every product -->
                <div v-if="products" v-for="product in products">
                    <ProductCard :product="product" />
                </div>
            </div>
            <!-- Cart -->
            <div class="col-5">
                <ProductsCart />
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