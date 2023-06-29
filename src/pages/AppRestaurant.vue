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
            this.fillCartProducts();
        },
        // Subtract one item from an already existing product. Delete if quantity = 0
        subQuantity(index) {
            console.log(this.products);
            let product = this.products.find(product => product.id === this.store.indexes[index]);
            console.log(product);
            if (this.getProductQuantity(index) > 1) {
                localStorage.setItem(this.store.indexes[index],
                    JSON.stringify({ productName: this.getProductName(index), quantity: this.getProductQuantity(index) - 1, price: Number(this.getProductPrice(index)) - Number(product.price) }));
                this.fillCartProducts();
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
            this.fillCartProducts();
            console.log(this.store.cartProducts);
        },
        fillCartProducts() {
            this.store.cartProducts = [];
            for (let i = 0; i < this.store.indexes.length; i++) {
                this.store.cartProducts.push({
                    id: this.store.indexes[i],
                    name: this.getProductName(i),
                    quantity: this.getProductQuantity(i),
                    price: this.getProductPrice(i),
                })
            }
            console.log(this.store.cartProducts);
        }
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
        this.fillCartProducts();
    }
}
</script>

<template>
    <!-- restaurant image -->
    <div class="restaurant-image">
        <img :src="restaurant.image" :alt="restaurant.name" class="restaurant-image w-100">
    </div>
    <!-- /restaurant image -->

    <!-- card restaurant details -->
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
    <!-- /card restaurant details -->

    <!-- Restaurant menu -->
    <div class="container" v-if="restaurant">

        <h1>Menù</h1>
        <div class="row">
            <div class="col-10 mx-auto col-md-8">
                <div class="row">
            <!-- Recall ProductCard component and cycle it for every product -->
                    <div class="col-sm-4 p-2" v-if="products" v-for="product in products">
                        <ProductCard :product="product" :restaurant="restaurant"/>
                    </div>
                </div>
            </div>
            <!-- Cart -->
            <div class="col-10 mx-auto col-md-4">
                <div class="row">
                    <ProductsCart :restaurant="restaurant"/>
                </div>
            </div> 
        </div>      
    </div>
    <!-- /Restaurant menu -->
</template>

<style lang="scss">
@use '../assets/scss/_partials/variables' as *;

.restaurant-image {
    height: 21.875rem;

    img {
        object-fit: cover;
    }
}

#restaurant-details {
    border: 3px solid #f0f3f4;
    border-radius: 20px;
    position: relative;
    top: -6.25rem;
    margin: auto;
    background-color: $ms_secondary_color_light;

    .highlight {
        background-color: $ms_secondary_color;
    }
}

.ms-new-cart-modal {
    height: 18.75rem;
    width: 34.375rem;
    background-color: black;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    visibility: hidden;
}
</style>