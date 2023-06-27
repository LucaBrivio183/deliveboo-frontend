<script>
// Import payment system
import braintree from 'braintree-web';
import store from '../store';
import axios from 'axios';

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
        createOrder() {
            const data = {
                name: this.formData.name,
                number: this.formData.number,
                address: this.formData.address,
                email: this.formData.email,
                products: this.store.cartProducts,
                restaurant: localStorage.getItem('id'),
                totalPrice: localStorage.getItem('totalPrice'),
            }
            axios.post(`${this.store.apiBaseUrl}${this.store.apiUrls.orders}`, {
                restaurant_id: 1,
                name: 'Pippo',
                email: 'pippo@pippo.it',
                address: 'Pippolandia n2',
                phone_number: '3336667890',
                total_price: 199.05,
            })
                .then((response) => {
                    console.log(response);
                });
        },
        payWithCreditCard() {
            if (this.hostedFieldInstance) {
                this.nonce = '';
                this.error = '';

                // Tokenize the form info
                this.hostedFieldInstance.tokenize().then(payload => {
                    // Token needed by backend in order to create the payment
                    this.nonce = payload.nonce;
                    this.createOrder();
                })
                    .catch(err => {
                        if (err.code === 'HOSTED_FIELDS_FIELDS_EMPTY') {
                            err.message = 'Tutti i dati sono obbligatori.';
                        } else if (err.code === 'HOSTED_FIELDS_FIELDS_INVALID') {
                            err.message = 'Alcuni dati non sono corretti.';
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
        // fillCartProducts() {
        //     this.store.cartProducts = [];
        //     for (let i = 0; i < this.store.indexes.length; i++) {
        //         this.store.cartProducts.push({
        //             id: this.store.indexes[i],
        //             name: this.getProductName(i),
        //             quantity: this.getProductQuantity(i),
        //             price: this.getProductPrice(i),
        //         })
        //     }
        // },
    },
    mounted() {
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
    // created() {
    //     this.fillCartProducts();
    // }
}
</script>

<template>
    <div class="container py-1 my-4">
        <div class="row">
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
                                <input type="text" class="form-control" id="number" name="number" v-mode="formData.number" required />
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