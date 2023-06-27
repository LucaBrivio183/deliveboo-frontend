<script>
import axios from 'axios';
import store from '../store';

// Import payment system
import braintree from 'braintree-web';

export default {
    name: 'AppPayment',
    data() {
        return {
            store,
            hostedFieldInstance: false,
            nonce: '',
            error: ''
        }
    },
    methods: {
        createOrder() {
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
            if(this.hostedFieldInstance)
            {
                this.nonce = '';
                this.error = '';
                
                // Tokenize the form info
                this.hostedFieldInstance.tokenize().then(payload => {
                    // Token needed by backend in order to create the payment
                    this.nonce = payload.nonce;
                }).then((response) => { 
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
        }
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
    }
}
</script>

<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-6 offset-3">
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
                            <label for="amount" class="form-label">Importo</label>
                            <div class="input-group mb-3">
                                <span class="input-group-text">€</span>
                                <input type="number" id="amount" class="form-control" placeholder="Inserisci l'importo" aria-label="Inserisci l'importo">
                            </div>
                        </div>
                        <hr>
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
                        <button type="submit" class="btn btn-primary" @click.prevent="payWithCreditCard()">Invia il pagamento</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>