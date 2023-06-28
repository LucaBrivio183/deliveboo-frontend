<script>
import store from '../store';
export default {
    name: 'ProductsCart',
    props: {
        restaurant: Object,
    },
    data() {
        return {
            store,
            // restaurant: null,
            products: [],
            indexes: JSON.parse(localStorage.getItem('indexes')),
            deliveryCost: this.restaurant.delivery_cost,
            finalPrice: 0,
            totalPrice: 0,
        }
    },
    methods: {
        // Axios call to get a specified restaurant with its products
        // getProducts() {
        //     axios.get(`${this.store.apiBaseUrl}${this.store.apiUrls.restaurant}/${this.$route.params.slug}`)       //Todo: replace "burger-king" with /${this.$route.params.slug}
        //         .then((response) => {
        //             this.restaurant = response.data.results;
        //             this.products = response.data.results.products;
        //         });
        // },
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
        getRestaurantId() {
            return Number(localStorage.getItem('id'));
        },
        // Add one item to an already existing product
        addQuantity(index) {
            console.log(this.products);
            let product = this.products.find(product => product.id === this.store.indexes[index]);
            console.log(product);
            localStorage.setItem(this.store.indexes[index],
                JSON.stringify({ productName: this.getProductName(index), quantity: this.getProductQuantity(index) + 1, price: Number(this.getProductPrice(index)) + (Number(this.getProductPrice(index)) / Number(this.getProductQuantity(index))) }));
            this.fillCartProducts();
        },
        // Subtract one item from an already existing product. Delete if quantity = 0
        subQuantity(index) {
            console.log(this.products);
            let product = this.products.find(product => product.id === this.store.indexes[index]);
            console.log(product);
            if (this.getProductQuantity(index) > 1) {
                localStorage.setItem(this.store.indexes[index],
                    JSON.stringify({ productName: this.getProductName(index), quantity: this.getProductQuantity(index) - 1, price: Number(this.getProductPrice(index)) - (Number(this.getProductPrice(index)) / Number(this.getProductQuantity(index))) }));
                this.fillCartProducts();
            } else {
                localStorage.removeItem(this.store.indexes[index]);
                // let tempIndexes = JSON.parse(localStorage.getItem('indexes'));
                this.store.indexes.splice(index, 1);
                localStorage.setItem('indexes',
                    JSON.stringify(this.store.indexes));
                if (this.store.indexes.length === 0) {
                    console.log('cancella ristorante');
                    localStorage.removeItem('id');
                }
                this.fillCartProducts();
            }
        },
        // Delete product from local Storage.
        deleteItem(index) {
            localStorage.removeItem(this.store.indexes[index]);
            // let tempIndexes = JSON.parse(localStorage.getItem('indexes'));
            this.store.indexes.splice(index, 1);
            localStorage.setItem('indexes',
                JSON.stringify(this.store.indexes));
            if (this.store.indexes.length === 0) {
                console.log('cancella ristorante');
                localStorage.removeItem('id');
            }
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
        },
        getTotalPrice() {
            this.finalPrice = 0;
            this.totalPrice = 0;
            for (let i = 0; i < this.store.indexes.length; i++) {
                const product = JSON.parse(localStorage.getItem(this.store.indexes[i]))
                console.log(product.price)
                this.finalPrice = this.finalPrice + Number(product.price);
            }

            this.totalPrice = this.finalPrice + Number(this.deliveryCost);
            localStorage.setItem("totalPrice", this.totalPrice);

            return Number(this.finalPrice + Number(this.deliveryCost)).toFixed(2);
        },
        getActiveRestaurantName() {
            let activeRestaurantName = localStorage.getItem('activeRestaurantName');
            return activeRestaurantName;
        },
        getActiveRestaurantDeliverycost() {
            let activeRestaurantDeliverycost = localStorage.getItem('activeRestaurantDeliverycost');
            return activeRestaurantDeliverycost;
        }
    },
    computed: {
        getProduct(index) {
            console.log(JSON.parse(localStorage.getItem(this.store.indexes[index])));
            return JSON.parse(localStorage.getItem(this.store.indexes[index]));
        },
    },
    created() {
        // this.getProducts();
        this.getIndexes();
        this.fillCartProducts();
    }
}
</script>

<template>
    <div class="cart-container p-0 rounded">
        <!-- cart top -->
        <div class="cart-top p-4 text-center rounded">
            <div>
                <img src="/images/cart.png" alt="cart" class="cart-logo">
                <h1 class="text-center">Il tuo Carrello</h1>
            </div>
        </div>

        <!--
            <div v-if="!getActiveRestaurantName()" class="restaurant-name text-center py-3 fw-bold rounded">
                Ristorante {{ restaurant.name }}
            </div>
            -->
        <div v-if="store.indexes.length !== 0" class="restaurant-name text-center py-3 fw-bold rounded">
            Ristorante {{ getActiveRestaurantName() }}
        </div>

        <!-- agiungere i v-for="(product, index) in store.indexes"> -->
        <div class="overflow-y-scroll items">
            <div class="bg-light p-3 m-2" v-for="(   product, index   ) in    store.indexes   " v-if="store.cartProducts">
                <!-- <div v-if="store.cartProducts !== []">{{ store.cartProducts[index].name }}</div> -->
                <div class=" d-flex justify-content-between">
                    <!-- product name -->
                    <div class="d-flex">
                        <div>{{ getProductName(index) }}</div>
                    </div>

                    <!-- delete product -->
                    <div class="delete-button" @click="deleteItem(index)">
                        <i class="fa-regular fa-circle-xmark"></i>
                    </div>
                </div>

                <!-- actions -->
                <div class="mt-3 d-flex justify-content-between">
                    <div class="d-flex">
                        <!-- minus -->
                        <div class="quantity-button" @click="subQuantity(index)">
                            <i class="fa-solid fa-circle-minus"></i>
                        </div>
                        <!-- product quantity -->
                        <div class="mx-2">{{ getProductQuantity(index) }}</div>
                        <!-- plus -->
                        <div class="quantity-button" @click="addQuantity(index)">
                            <i class="fa-solid fa-circle-plus"></i>
                        </div>
                    </div>

                    <!-- <div>{{ store.cartProducts[index].quantity }}</div> -->
                    <!-- product price -->
                    <div>€ {{ Number(getProductPrice(index)).toFixed(2) }}</div>
                </div>
                <!-- /actions -->
            </div>
        </div>

        <!--
            <div v-if="!getActiveRestaurantDeliverycost()" class="bg-light p-3 m-2">
                Consegna: € {{ restaurant.delivery_cost }}
            </div>
            -->
        <div  v-if="store.indexes.length !== 0">
            <!-- delivery cost -->
            <div class="bg-light p-3 m-2">
                Consegna: € {{ getActiveRestaurantDeliverycost() }}
            </div>

            <!-- final price -->
            <div class="bg-light p-3 m-2 fw-bold">
                Totale: € {{ getTotalPrice() }}
            </div>
            <!-- order -->
            <div class="text-center m-2">
                <router-link :to="{ name: 'payment' }" class="btn order-button">
                    Ordina!
                </router-link>
            </div>
        </div>
        <!-- empty cart -->
        <div v-else class="bg-light p-3 m-2">
            Il tuo carrello è vuoto
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/_partials/variables' as *;

.cart-container {
    border: 2px solid $ms_primary_background;

    .items {
        max-height: 400px;
    }

    .cart-top {
        background-color: $ms_primary_color;
        border-bottom: 2px solid $ms_primary_background;

        .cart-logo {
            max-height: 5rem;
        }
    }

    .restaurant-name {
        border-bottom: 2px solid $ms_primary_background;
    }

    .order-button {
        background-color: $ms_secondary_color_light;
    }

    .quantity-button {
        color: $ms_secondary_color_medium;
    }

    .delete-button {
        color: rgb(175, 175, 175);
    }

    .quantity-button,
    .delete-button {
        cursor: pointer;

        &:hover {
            color: $ms_secondary_color;
        }
    }
}
</style>