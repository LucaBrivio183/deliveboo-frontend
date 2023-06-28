<script>
// Import payment system
import braintree from 'braintree-web';
import store from '../store';
import axios from 'axios';
// Import beautiful alerts
import swal from 'sweetalert';

export default {
    name: 'AppPayment',
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
        getTotalPrice() {
            /*
            let finalPrice = 0;
            for (let i = 0; i < this.store.cartProducts.length; i++) {
                let productprice = this.store.cartProducts[i].price * this.store.cartProducts[i].quantity;
                finalPrice = finalPrice + Number(productprice);
            }
            console.log(finalPrice);
            */
            let totalPrice = 0
            totalPrice = localStorage.getItem('totalPrice');
            console.log(totalPrice);
            return (Number(totalPrice).toFixed(2));
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
            // console.log(JSON.parse(localStorage.getItem(this.store.indexes[index])));
            return JSON.parse(localStorage.getItem(this.store.indexes[index])).quantity;
        },
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
        <div class="text-center">
            <router-link :to="{ name: 'home' }" class="btn btn-primary">
                Torna alla home
            </router-link>
        </div>
        
        <div class="row mt-3">
            <div class="col-6 offset-3 rounded py-3">
                <form>
                    <div class="fieldset">
                        <legend>Informazioni di pagamento</legend>
                        <div class="alert alert-success" v-if="nonce">
                            Pagamento inviato con successo.
                        </div>
                        <div class="alert alert-danger" v-if="error">
                            {{ error }}
                        </div>
                        <div class="mb-3">
                            <div class="mb-3 mt-3">
                                <span class="fw-bold">Importo totale: € {{ getTotalPrice() }}</span>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <!-- Name -->
                            <div class="mb-3 col-12 col-lg-6">
                                <label for="name" class="form-label">Nome e Cognome</label>
                                <input type="text" class="form-control" id="name" name="name" v-model="formData.name" required />
                            </div>
                            <!-- Number -->
                            <div class="mb-3 col-12 col-lg-6">
                                <label for="number" class="form-label">Numero di telefono</label>
                                <input type="text" class="form-control" id="number" name="number" v-model="formData.number" required />
                            </div>
                            <!-- Address -->
                            <div class="mb-3 col-12 col-lg-6">
                                <label for="address" class="form-label">Indirizzo</label>
                                <input type="text" class="form-control" id="address" name="address" v-model="formData.address" required />
                            </div>
                            <!-- Email -->
                            <div class="mb-3 col-12 col-lg-6">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email" v-model="formData.email" required />
                            </div>
                            <div class="mb-3">
                                <label for="creditCardNumber" class="form-label">Carta di credito</label>
                                <div class="form-control" id="creditCardNumber"></div>
                            </div>
                            <div class="mb-3">
                                <div class="row">
                                    <div class="col-6">
                                        <label for="expireDate" class="form-label">Data di scadenza</label>
                                        <div class="form-control" id="expireDate"></div>
                                    </div>
                                    <div class="col-6">
                                        <label for="cvv" class="form-label">CVV</label>
                                        <div class="form-control" id="cvv"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" @click.prevent="payWithCreditCard()">Invia il
                            pagamento</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/_partials/variables' as *;

.col-6 {
    background-color: $ms_secondary_color_light;
}
</style>