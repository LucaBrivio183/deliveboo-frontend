<script>
import store from '../store';
export default {
    name: 'ProductCard',
    props: {
        product: Object,
        restaurant: Object,
    },
    data() {
        return {
            store,
            productQuantity: 1,
            finalPrice: this.product.price,
            // indexes: [],
            // products: {},
        }
    },
    methods: {
        // Decrease the amount of product
        decreaseProductQuantity() {
            if(this.productQuantity > 1) {
                return this.productQuantity--;
            }
        },
        // Increase the amount of product
        increaseProductQuantity() {
            return this.productQuantity++;
        },
        addItem() {
            // If you already had an order from another restorant, stop
            if(this.restaurant.id !== Number(localStorage.getItem('id')) && localStorage.getItem('id') != null) {
                return
            } else {
                // If restaurant.id in local storage is null, set it
                if(localStorage.getItem('id') == null) {
                	localStorage.setItem('id', this.restaurant.id);
		        }

                // If there was a indexes in local storage, parse it and assign it to this.store.indexes
                if(JSON.parse(localStorage.getItem('indexes')) != null) {
                    this.store.indexes = JSON.parse(localStorage.getItem('indexes'));
                }

                // If indexes already contains this.product.id, don't push it
                if(!this.store.indexes.includes(this.product.id)) {
                    this.store.indexes.push(this.product.id);
                }
                // Save this.store.indexes in local storage
                localStorage.setItem('indexes',
                JSON.stringify(this.store.indexes));

                // Set product info
                localStorage.setItem(this.product.id,
                JSON.stringify({productName: this.product.name, quantity: this.productQuantity, price: this.finalPrice}));
                // Set product info
                // localStorage.setItem(`${this.product.id}name`, this.product.name)
                // localStorage.setItem(`${this.product.id}quantity`,  this.productQuantity)
                // localStorage.setItem(`${this.product.id}price`, this.finalPrice)

            }
        }
    },
    computed: {
        // Reset product quantity
        resetProductQuantity() {
            if(this.productQuantity !== 1) {
                return this.productQuantity = 1;
            }
        },
        // Change the price accordingly
        changeProductPrice() {
            return this.finalPrice = this.productQuantity * this.product.price;
        }
    }
}
</script>

<template>
    <!-- product card -->
    <div id="product-card" class="row mb-3 bg-light p-2 align-items-center text-dark">
        <!-- col details -->
        <div class="col py-3">
            <h3 class="mb-3">{{ product.name }}</h3>
            <div class="d-flex justify-content-between">
                <div>
                    <span class="fw-bold">€ {{ product.price }}</span>
                    <span class="fw-bold ms-3">{{ product.discount }}</span>
                    <p class="badge rounded-pill py-2 px-3 text-light">Ingredienti</p>
                </div>
                <div class="actions">
                    <button>+</button>
                </div>
                <!--<p>{{ product.ingredients 
                    v-if="(product.discount !== 0)"
                    }}</p>-->
            </div>

    <!-- Product card with modal trigger // productQuantity gets a reset after each card click -->
    <div class="card h-100" data-bs-toggle="modal" :data-bs-target="'#product' + product.id" @click="resetProductQuantity">
        <!-- Product image -->
        <img src="https://picsum.photos/300/200" class="card-img-top h-50" :alt="product.name">
        <!-- /Product image -->
        <!-- Product detail -->
        <div class="card-body">
            <h2 class="card-title mb-2 fs-3">{{ product.name }}</h2>
            <!-- <div class="mb-2" v-if="product.description">{{ product.description }}</div> -->
            <div class="card-text">{{ product.price }} €</div>
            
        </div>
        <!-- /col details -->
        <!-- col image -->
        <div id="img-container" class="col-3">
            <img src="https://picsum.photos/300/200" class="img-fluid" :alt="product.name">
        </div>
        <!-- /col image -->
    </div>

    <!-- product card -->

    <!-- /Product card -->

    <!-- Modal -->
    <div class="modal fade" :id="'product' + product.id" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ product.name }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img src="https://picsum.photos/300/200" class="card-img-top h-50" :alt="product.name">
                    <div class="card-text mt-2" v-if="product.description">{{ product.description }}</div>
                    <div class="card-text mt-2" v-if="product.ingredients"><strong>Ingredienti:</strong> {{ product.ingredients }}</div>
                </div>
                <div class="modal-footer">
                    <div class="quantity w-100 text-center fs-5">
                        <!-- If productQuantity === 1, minus button is gray and not clickable -->
                        <span :role="(this.productQuantity !== 1) ? 'button' : ''" @click="decreaseProductQuantity()"><i :class="`fa-solid fa-circle-minus  ${(this.productQuantity === 1) ? 'opacity-25' : ''}`"></i></span>
                        <span class="mx-3">{{ this.productQuantity }}</span>
                        <span role="button" @click="increaseProductQuantity()"><i class="fa-solid fa-circle-plus"></i></span>
                    </div>
                    <!-- The final product price gets changed and formatted to two decimals -->
                    <button type="button" class="btn btn-primary w-100" @click="addItem">Aggiungi per {{ changeProductPrice.toFixed(2) }} €</button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<style lang="scss">
@use '../assets/scss/_partials/variables' as *;

#product-card {
    border: 2px solid #e7e7e7;

    .badge {
        background-color: $ms_secondary_color;
        cursor: pointer;
    }
}
</style>