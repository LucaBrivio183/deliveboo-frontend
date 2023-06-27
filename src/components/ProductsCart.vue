<script>
import store from '../store';
export default {
    name: 'ProductsCart',
    data() {
        return {
            store,
            restaurant: null,
            products: [],
            indexes: JSON.parse(localStorage.getItem('indexes')),
            potatoes: 3,
        }
    },
    methods: {
        // Axios call to get a specified restaurant with its products
        // getProducts() {
        //     axios.get(`${this.store.apiBaseUrl}${this.store.apiUrls.restaurant}/${this.$route.params.slug}`)       //Todo: replace "burger-king" with /${this.$route.params.slug}
        //         .then((response) => {
        //             this.restaurant = response.data.results;
        //             this.products = response.data.results.products;
        //         });
        // },
        // Save in store.indexes the indexes in local storage
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
        // Get product quantity from local storage
        getProductQuantity(index) {
            // console.log(JSON.parse(localStorage.getItem(this.store.indexes[index])));
            return JSON.parse(localStorage.getItem(this.store.indexes[index])).quantity;
        },
        // Get product price from local storage
        getProductPrice(index) {
            // console.log(JSON.parse(localStorage.getItem(this.store.indexes[index])));
            return JSON.parse(localStorage.getItem(this.store.indexes[index])).price;
        },
        // Add one item to an already existing product
        addQuantity(index) {
            console.log(this.products);
            let product = this.products.find(product => product.id === this.store.indexes[index]);
            console.log(product);
            localStorage.setItem(this.store.indexes[index],
                JSON.stringify({ productName: this.getProductName(index), quantity: this.getProductQuantity(index) + 1, price: Number(this.getProductPrice(index)) + (Number(this.getProductPrice(index)) / Number(this.getProductQuantity(index))) }));
            this.fillCartProducts();
        },
        // Subtract one item from an already existing product. Delete if quantity = 0
        subQuantity(index) {
            console.log(this.products);
            let product = this.products.find(product => product.id === this.store.indexes[index]);
            console.log(product);
            if (this.getProductQuantity(index) > 1) {
                localStorage.setItem(this.store.indexes[index],
                    JSON.stringify({ productName: this.getProductName(index), quantity: this.getProductQuantity(index) - 1, price: Number(this.getProductPrice(index)) - (Number(this.getProductPrice(index)) / Number(this.getProductQuantity(index))) }));
                this.fillCartProducts();
            } else {
                localStorage.removeItem(this.store.indexes[index]);
                // let tempIndexes = JSON.parse(localStorage.getItem('indexes'));
                this.store.indexes.splice(index, 1);
                localStorage.setItem('indexes',
                JSON.stringify(this.store.indexes));
                this.fillCartProducts();
            }
        },
        // Delete product from local Storage.
        deleteItem(index) {
            localStorage.removeItem(this.store.indexes[index]);
            // let tempIndexes = JSON.parse(localStorage.getItem('indexes'));
            this.store.indexes.splice(index, 1);
            localStorage.setItem('indexes',
                JSON.stringify(this.store.indexes));
            this.fillCartProducts();
            console.log(this.store.cartProducts);
        },
        fillCartProducts() {
            this.store.cartProducts = [];
            for (let i = 0; i < this.store.indexes.length; i++) {
                this.store.cartProducts.push({
                    id: this.store.indexes[i],
                    name: this.getProductName(i),
                    quantity: this.getProductQuantity(i),
                    price: this.getProductPrice(i),
                })
            }
            console.log(this.store.cartProducts);
        }
    },
    computed: {
        getProduct(index) {
            console.log(JSON.parse(localStorage.getItem(this.store.indexes[index])));
            return JSON.parse(localStorage.getItem(this.store.indexes[index]));
        },
    },
    created() {
        // this.getProducts();
        this.getIndexes();
        this.fillCartProducts();
    }
}
</script>

<template>
    <div class="bg-secondary">
        <div class="bg-success p-4 text-center ">
            <div><i class="fa-solid fa-cart-shopping fs-1"></i></div>
            <h1 class="text-center">Il tuo Carrello</h1>
        </div>
        <!-- agiungere i v-for="(product, index) in store.indexes"> -->
        <div class="overflow-y-scroll items">
            <div class="bg-light p-3 m-2 d-flex justify-content-between" v-for="(product, index) in store.indexes" v-if="store.cartProducts">
                <!-- <div v-if="store.cartProducts !== []">{{ store.cartProducts[index].name }}</div> -->
                <div class="d-flex">
                    <div>{{ getProductName(index) }}</div>
                    <div class="btn btn-danger" @click="deleteItem(index)">Delete item</div>
                </div>
                <div class="d-flex align-items-center">
                    <div class="btn btn-primary" @click="subQuantity(index)">-</div>
                    <div>{{ getProductQuantity(index) }}</div>
                    <div class="btn btn-success" @click="addQuantity(index)">+</div>
                    <!-- <div>{{ store.cartProducts[index].quantity }}</div> -->
                    <div>{{ getProductPrice(index) }} €</div>
                </div>
            </div>
        </div>
        <div class="bg-light p-3 m-2">
            Consegna:
        </div>
        <div class="bg-light p-3 m-2">
            Totale:
        </div>

        <div class="text-center m-2">
            <a href="#" class="btn btn-success">Ordina!</a>
        </div>
    </div>
</template>

<style scoped>
.items {
    max-height: 400px;
}
</style>