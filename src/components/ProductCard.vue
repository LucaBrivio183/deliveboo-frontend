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
            sameRestaurant: true,
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
                this.sameRestaurant = false;
            } else {
                // If restaurant.id in local storage is null, set it
                if(localStorage.getItem('id') != null) {
                    localStorage.removeItem('id');
		        }
                	localStorage.setItem('id', this.restaurant.id);

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

                const existingObject = this.store.cartProducts.find(obj => obj.id === this.product.id);
                if (!existingObject) {
                this.store.cartProducts.push({
                    id: this.product.id,
                    name: this.product.name,
                    quantity: this.productQuantity,
                    price: this.finalPrice,
                })
                }

                console.log(this.store.cartProducts);

            }
        },
        newCart() {
            this.sameRestaurant = true;
            localStorage.clear();
            // If restaurant.id in local storage is null, set it
                if(localStorage.getItem('id') != null) {
                    localStorage.removeItem('id');
		        }
                	localStorage.setItem('id', this.restaurant.id);

                // If there was a indexes in local storage, parse it and assign it to this.store.indexes
                this.store.indexes = [];

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

                const existingObject = this.store.cartProducts.find(obj => obj.id === this.product.id);
                if (!existingObject) {
                this.store.cartProducts.push({
                    id: this.product.id,
                    name: this.product.name,
                    quantity: this.productQuantity,
                    price: this.finalPrice,
                })
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
    <!-- Product card with modal trigger // productQuantity gets a reset after each card click -->
    <div class="card h-100" :class="{ 'inTheBasket': this.store.indexes.includes(product.id) }" @click="resetProductQuantity">
        <!-- card img -->
        <img src="https://picsum.photos/300/200" class="card-img-top" :alt="product.name">
        <!-- /card img -->
        <!-- col details -->
        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">{{ product.name }}</h5>
            <p :class="{ 'text-decoration-line-through': product.discount !== 0 }" class="card-text">€ {{ product.price }}</p>
            <p v-if="(product.discount !== 0)" class="card-text">€ {{ product.discount }}</p>
            <div class="">
                <a href="#" class="btn btn-outline-success w-100" data-bs-toggle="modal"
                :data-bs-target="'#product' + product.id" @click.stop="$emit('addQuantity')">+</a>
            </div>
        </div>
            <!-- /col details -->
    </div>

    <!-- Modal -->
    <div class="modal fade" :id="'product' + product.id" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ product.name }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img src="https://picsum.photos/300/200" class="card-img-top" :alt="product.name">
                    <div class="card-text mt-2" v-if="product.description">{{ product.description }}</div>
                    <div class="card-text mt-2" v-if="product.ingredients"><strong>Ingredienti:</strong> {{
                        product.ingredients }}</div>
                </div>
                <div class="modal-footer" v-if="sameRestaurant">
                    <div class="quantity w-100 text-center fs-5">
                        <!-- If productQuantity === 1, minus button is gray and not clickable -->
                        <span :role="(this.productQuantity !== 1) ? 'button' : ''" @click="decreaseProductQuantity()"><i
                                :class="`fa-solid fa-circle-minus  ${(this.productQuantity === 1) ? 'opacity-25' : ''}`"></i></span>
                        <span class="mx-3">{{ this.productQuantity }}</span>
                        <span role="button" @click="increaseProductQuantity()"><i
                                class="fa-solid fa-circle-plus"></i></span>
                    </div>
                    <!-- The final product price gets changed and formatted to two decimals -->
                    <button type="button" class="btn btn-primary w-100" @click="addItem" data-bs-dismiss="modal">Aggiungi per {{
                        changeProductPrice.toFixed(2) }} €</button>
                </div>
                <div class="modal-footer" v-else>
                    <div>Hai già un carrello in un altro ristorante! Clicca procedi per creare un nuovo carrello!</div>
                    <div class="btn btn-danger" @click="newCart">Procedi</div>
                </div>
            </div>
        </div>
    </div>
    <!-- /Modal -->
</template>

<style lang="scss">
@use '../assets/scss/_partials/variables' as *;

.card {
    border: 2px solid #e7e7e7;

    &:hover{
        -webkit-box-shadow: 6px 15px 25px 6px rgba(0,0,0,0.4); 
        box-shadow: 6px 15px 25px 6px rgba(0,0,0,0.4);
    }
    .card-body{
        h5{
            font-size: 14px;
            font-weight: bold;
        }
        p{
            font-size: 12px;
        }
    }
    .badge {
        background-color: $ms_secondary_color;
        cursor: pointer;
    }


    .actions {
        btn {
            
            &:hover {
                transform: scale(1.1);
            }
        }
    }
}

.inTheBasket {
    border-bottom: 5px solid $ms_secondary_color !important;
}

</style>