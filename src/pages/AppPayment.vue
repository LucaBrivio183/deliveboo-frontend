<script>
// Import payment system
import braintree from 'braintree-web';
import store from '../store';
import axios from 'axios';
// Import beautiful alerts
import swal from 'sweetalert';

import CartSummaryElement from '../components/CartSummaryElement.vue';

export default {
    name: 'AppPayment',
    components: {
        CartSummaryElement
    },
    data() {
        return {
            hostedFieldInstance: false,
            nonce: '',
            error: '',
            store,
            formData: {
                name: '',
                number: '',
                address: '',
                email: '',
            }
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
        validateForm() {
            // Validate name
            if (!this.formData.name) {
                this.error = 'Inserisci un nome';
                return false;
            }

            // Validate number
            if (!this.formData.number) {
                this.error = 'Inserisci un numero di telefono';
                return false;
            }

            // Validate address
            if (!this.formData.address) {
                this.error = 'Inserisci un indirizzo';
                return false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.formData.email || !emailRegex.test(this.formData.email)) {
                this.error = 'Inserire un indirizzo email valido';
                return false;
            }

            return true;
        },
        createOrder() {
            // Object to send to backend
            const data = {
                name: this.formData.name,
                phone_number: this.formData.number,
                address: this.formData.address,
                email: this.formData.email,
                products: this.store.cartProducts,
                restaurant_id: localStorage.getItem('id'),
                total_price: localStorage.getItem('totalPrice'),
            }
            axios.post(`${this.store.apiBaseUrl}${this.store.apiUrls.orders}`, data)
                .then((response) => {
                    console.log(response);
                });
        },
        payWithCreditCard() {
            if (this.hostedFieldInstance) {
                if (!this.validateForm()) {
                    return;
                }
                this.nonce = '';
                this.error = '';

                // Tokenize the form info
                this.hostedFieldInstance.tokenize().then(payload => {
                    // Token needed by backend in order to create the payment
                    this.nonce = payload.nonce;
                    this.createOrder();

                    // Clear the old cart
                    localStorage.clear();
                    this.store.indexes = [];

                    // The user gets notified about the successful payment
                    swal("Pagamento effettuato!", "Il tuo ordine è stato inviato al ristorante!", "success");
                    this.$router.push({ name: 'home' });
                })
                    .catch(err => {
                        if (err.code === 'HOSTED_FIELDS_FIELDS_EMPTY') {
                            err.message = 'Tutti i dati sono obbligatori.';
                        } else if (err.code === 'HOSTED_FIELDS_FIELDS_INVALID') {
                            err.message = 'Alcuni dati di pagamento non sono corretti.';
                        }
                        this.error = err.message;
                    })
            }
        },
        fillCartProducts() {
            this.store.cartProducts = [];
            if (JSON.parse(localStorage.getItem('indexes')) != null) {
                this.store.indexes = JSON.parse(localStorage.getItem('indexes'));
            }
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
        getActiveRestaurantName() {
            let activeRestaurantName = localStorage.getItem('activeRestaurantName');
            return activeRestaurantName;
        },
        getActiveRestaurantDeliverycost() {
            let activeRestaurantDeliverycost = localStorage.getItem('activeRestaurantDeliverycost');
            return activeRestaurantDeliverycost;
        },
        getTotalPrice() {
            const finPrice = localStorage.getItem('finalPrice');
            return (Number(finPrice) + Number(this.getActiveRestaurantDeliverycost())).toFixed(2);
        }
    },
    mounted() {
        console.log(this.store.indexes);
        // Create a client instance
        braintree.client.create({
            // Personal token
            authorization: 'sandbox_9qd65ssc_nvtdqmxz7yc3gvfh'
        })
            .then(clientInstance => {
                let options = {
                    client: clientInstance,
                    // Configuring hosted fields
                    fields: {
                        number: {
                            selector: '#creditCardNumber',
                            placeholder: 'Inserisci il numero della Carta di credito'
                        },
                        cvv: {
                            selector: '#cvv',
                            placeholder: 'Inserisci il CVV'
                        },
                        expirationDate: {
                            selector: '#expireDate',
                            placeholder: '00 / 0000'
                        }
                    }
                }
                // Create hosted fields
                return braintree.hostedFields.create(options)
            })
            // Send data do Braintree
            .then(hostedFieldInstance => {
                this.hostedFieldInstance = hostedFieldInstance;
            })
            .catch(err => {
            });
    },
    created() {
        this.fillCartProducts();
    }
}
</script>

<template>
    <div class="container py-1 my-4">
        <div class="row mt-3 mb-5 justify-content-center align-items-start">

            <CartSummaryElement class="d-none d-lg-block" />

            <!-- Buttons -->
            <div class="d-lg-none d-flex justify-content-center">
                <button class="summary-button btn btn-primary mb-3 me-3 border-0 text-dark" type="button"
                    data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Riepilogo
                    ordine</button>
            </div>
            <!-- /Buttons -->

            <!-- Payment -->
            <div class="col-11 col-lg-8 p-4 border">
                <form>
                    <div class="fieldset">
                        <legend>Informazioni di pagamento</legend>
                        <div class="alert alert-success" v-if="nonce">
                            Pagamento inviato con successo.
                        </div>
                        <div class="alert alert-danger" v-if="error">
                            {{ error }}
                        </div>
                        <div class="bg-light rounded p-3">
                            <!-- Restaurant name -->
                            <div class="">Pagamento a favore di {{ getActiveRestaurantName() }}</div>
                            <!-- Final price -->
                            <div class="fw-bold mt-2">Importo totale: € {{ getTotalPrice() }}</div>
                        </div>
                        <hr>
                        <div class="row">
                            <!-- Name -->
                            <div class="mb-3 col-12 col-lg-6">
                                <label for="name" class="form-label">Nome e Cognome</label>
                                <input type="text" class="form-control" id="name" name="name" v-model="formData.name"
                                    required />
                            </div>
                            <!-- Number -->
                            <div class="mb-3 col-12 col-lg-6">
                                <label for="number" class="form-label">Numero di telefono</label>
                                <input type="text" class="form-control" id="number" name="number" v-model="formData.number"
                                    required />
                            </div>
                            <!-- Address -->
                            <div class="mb-3 col-12 col-lg-6">
                                <label for="address" class="form-label">Indirizzo</label>
                                <input type="text" class="form-control" id="address" name="address"
                                    v-model="formData.address" required />
                            </div>
                            <!-- Email -->
                            <div class="mb-3 col-12 col-lg-6">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email" v-model="formData.email"
                                    required />
                            </div>
                            <!-- Credit card -->
                            <div class="mb-3">
                                <label for="creditCardNumber" class="form-label">Carta di credito</label>
                                <div class="credit-card d-flex align-items-center justify-content-start form-control"
                                    id="creditCardNumber" type="text"></div>
                            </div>
                            <div class="mb-3">
                                <div class="row">
                                    <!-- Expire Date -->
                                    <div class="col-6">
                                        <label for="expireDate" class="form-label">Data di scadenza</label>
                                        <div class="expire-date form-control d-flex align-items-center justify-content-start"
                                            id="expireDate"></div>
                                    </div>
                                    <!-- CVV -->
                                    <div class="col-6">
                                        <label for="cvv" class="form-label">CVV</label>
                                        <div class="cvv form-control d-flex align-items-center justify-content-start"
                                            id="cvv"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary payment-button border-0"
                                @click.prevent="payWithCreditCard()">Invia il
                                pagamento</button>
                        </div>
                    </div>
                </form>
            </div>
            <!-- /Payment -->

            <!-- Offcanvas -->
            <div class="offcanvas offcanvas-end d-lg-none" tabindex="-1" id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <CartSummaryElement />
                </div>
            </div>
            <!-- /Offcanvas -->
        </div>

    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/_partials/variables' as *;

.items {
    max-height: 20rem;
}

.payment-button {
    background-color: $ms_secondary_color_medium;

    &:hover {
        background-color: $ms_secondary_color;
    }
}

.summary-button {
    background-color: $ms_secondary_color_light;

    &:hover {
        background-color: $ms_secondary_color_medium;
    }
}

.credit-card,
.expire-date,
.cvv {
    max-height: 2.5rem;
}

.order-summary {
    position: sticky;
    top: 0;
    left: 0;
}
</style>