<script>
// Import payment system
import braintree from 'braintree-web';
import store from '../store';

export default {
    name: 'AppPayment',
    data() {
        return {
            hostedFieldInstance: false,
            nonce: '',
            error: '',
            store,
        }
    },
    methods: {
        payWithCreditCard() {
            if(this.hostedFieldInstance)
            {
                this.nonce = '';
                this.error = '';
                
                // Tokenize the form info
                this.hostedFieldInstance.tokenize().then(payload => {
                    // Token needed by backend in order to create the payment
                    this.nonce = payload.nonce;
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
            return(this.store.finalPrice + Number(this.store.deliveryCost));
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
                            <label for="amount" class="form-label">Importo totale senza costi di consegna</label>
                            <div class="input-group mb-3">
                                <span>€ {{ getTotalPrice() }}</span>
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