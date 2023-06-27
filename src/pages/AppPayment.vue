<script>
import braintree from 'braintree-web';

export default {
    name: 'AppPayment',
    data() {
        return {
            hostedFieldInstance: false,
            nonce: '',
            error: ''
        }
    },
    methods: {
        payWithCreditCard() {
            if(this.hostedFieldInstance)
            {
                this.nonce = '';
                this.error = '';
                
                this.hostedFieldInstance.tokenize().then(payload => {
                    console.log(payload);
                    this.nonce = payload.nonce;
                })
                .catch(err => {
                    console.error(err);
                    this.error = err.message;
                })
            }
        }
    },
    mounted() {
        braintree.client.create({
            authorization: 'sandbox_9qd65ssc_nvtdqmxz7yc3gvfh'
        })
        .then(clientInstance => {
            let options = {
                client: clientInstance,
                fields: {
                    number: {
                        selector: '#creditCardNumber',
                        placeholder: 'Enter Credit Card'
                    },
                    cvv: {
                        selector: '#cvv',
                        placeholder: 'Enter CVV'
                    },
                    expirationDate: {
                        selector: '#expireDate',
                        placeholder: '00 / 0000'
                    }
                }
            }
            return braintree.hostedFields.create(options)
        })
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
                        <legend>Payment Information</legend>
                        <div class="alert alert-success" v-if="nonce">
                            Successfully generated nonce.
                        </div>
                        <div class="alert alert-danger" v-if="error">
                            {{ error }}
                        </div>
                        <div class="mb-3">
                            <label for="amount" class="form-label">Amount</label>
                            <div class="input-group mb-3">
                                <span class="input-group-text">$</span>
                                <input type="number" id="amount" class="form-control" placeholder="Enter Amount" aria-label="Amount (to the nearest dollar)">
                            </div>
                        </div>
                        <hr>
                        <div class="mb-3">
                            <label for="creditCardNumber" class="form-label">Credit Card Number</label>
                            <div class="form-control" id="creditCardNumber"></div>
                        </div>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-6">
                                    <label for="expireDate" class="form-label">Expire Date</label>
                                    <div class="form-control" id="expireDate"></div>
                                </div>
                                <div class="col-6">
                                    <label for="cvv" class="form-label">CVV</label>
                                    <div class="form-control" id="cvv"></div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" @click.prevent="payWithCreditCard()">Pay with Credit Card</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>