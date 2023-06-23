<script>
export default {
    name: 'ProductCard',
    data() {
        return {
            productQuantity: 1,
            finalPrice: this.product.price
        }
    },
    props: {
        product: Object
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
    <!-- Product card with modal trigger -->
    <div class="card h-100" data-bs-toggle="modal" :data-bs-target="'#product' + product.id" @click="resetProductQuantity">
        <!-- Product image -->
        <img src="https://picsum.photos/300/200" class="card-img-top h-50" :alt="product.name">
        <!-- /Product image -->
        <!-- Product detail -->
        <div class="card-body">
            <h2 class="card-title mb-2 fs-3">{{ product.name }}</h2>
            <!-- <div class="mb-2" v-show="product.description">{{ product.description }}</div> -->
            <div class="card-text">{{ product.price }} €</div>
        </div>
        <!-- /Product detail -->
    </div>
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
                        <span role="button" @click="decreaseProductQuantity()"><i class="fa-solid fa-circle-minus"></i></span>
                        <span class="mx-3">{{ this.productQuantity }}</span>
                        <span role="button" @click="increaseProductQuantity()"><i class="fa-solid fa-circle-plus"></i></span>
                    </div>
                    <!-- The final product price gets changed and formatted to two decimals -->
                    <button type="button" class="btn btn-primary w-100">Aggiungi per {{ changeProductPrice.toFixed(2) }} €</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .card {

        border: .0625rem solid #bbb;
        border-radius: .3125rem;
        cursor: pointer;
        max-height: 200px;

        &:hover {
            box-shadow: .3125rem .3125rem .9375rem 0px rgba(0,0,0,0.75);
        }
    }
</style>