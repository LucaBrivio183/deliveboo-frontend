<script>

import store from '../store';

export default {
    name: 'CartSummaryElement',
    data() {
        return {
            store,
        }
    },
    methods: {
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
        // Get product price from local storage
        getProductPrice(index) {
            // console.log(JSON.parse(localStorage.getItem(this.store.indexes[index])));
            return JSON.parse(localStorage.getItem(this.store.indexes[index])).price;
        },
        getRestaurantId() {
            return Number(localStorage.getItem('id'));
        },
        fillCartProducts() {
            this.store.cartProducts = [];
            for (let i = 0; i < this.store.indexes.length; i++) {
                this.store.cartProducts.push({
                    id: this.store.indexes[i],
                    // name: this.getProductName(i),
                    quantity: this.getProductQuantity(i),
                    // price: this.getProductPrice(i),
                })
            }
        },
        getProductQuantity(index) {
            return JSON.parse(localStorage.getItem(this.store.indexes[index])).quantity;
        },
        getTotalPrice() {
            const totalPrice = localStorage.getItem('totalPrice');
            return (Number(totalPrice).toFixed(2));
        },
        getActiveRestaurantName() {
            let activeRestaurantName = localStorage.getItem('activeRestaurantName');
            return activeRestaurantName;
        },
        getActiveRestaurantDeliverycost() {
            let activeRestaurantDeliverycost = localStorage.getItem('activeRestaurantDeliverycost');
            return activeRestaurantDeliverycost;
        },
    }
}
</script>

<template>
    <!-- Order-summary -->
    <div class="order-summary col-12 col-lg-4 bg-light border">
        <div class="cart-container rounded">
            <!-- Cart top -->
            <div class="cart-top p-3 text-center">
                <h5>Riepilogo dell'ordine</h5>
                <h5 class="pt-2 fw-bold">{{ getActiveRestaurantName() }}</h5>
            </div>

            <!-- Items -->
            <div class="overflow-y-scroll items mb-3 border">
                <!-- Product -->
                <div class="bg-light p-3 m-2 bg-white" v-for="(   product, index   ) in    store.indexes   "
                    v-if="store.cartProducts">
                    <div class=" d-flex justify-content-between">
                        <!-- Product name -->
                        <div class="d-flex">
                            <div>{{ getProductName(index) }}</div>
                        </div>

                    </div>
                    <div class="mt-3 d-flex justify-content-between">
                        <!-- Product quantity -->
                        <div class="mx-2"><small>Qtà</small> {{ getProductQuantity(index) }}</div>
                        <!-- Product price -->
                        <div>€ {{ Number(getProductPrice(index)).toFixed(2) }}</div>
                    </div>
                </div>
                <!-- /Product -->
            </div>
            <!-- /Items -->

            <div v-if="store.indexes.length !== 0">
                <!-- Delivery cost -->
                <div class="bg-light p-2 m-2">
                    Consegna: € {{ getActiveRestaurantDeliverycost() }}
                </div>

                <!-- Final price -->
                <div class="bg-light p-2 m-2 fw-bold">
                    Totale: € {{ getTotalPrice() }}
                </div>
            </div>

            <router-link :to="{ name: 'restaurant' }" class="btn btn-primary back-button text-dark border-0 mb-3 me-3 ms-3 mt-3">
                <i class="fa-solid fa-arrow-left"></i>
                Torna al carrello
            </router-link>
        </div>
    </div>
    <!-- /Order-summary -->
</template>

<style lang="scss" scoped>
@use '../assets/scss/_partials/variables' as *;

.order-summary {
    position: sticky;
    top: 0;
    left: 0;

    .items {
        max-height: 20rem;
    }
}

.back-button {
    background-color: $ms_primary_color_light;

    &:hover {
        background-color: $ms_primary_color_ultralight;
    }
}

</style>