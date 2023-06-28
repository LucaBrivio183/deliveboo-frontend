import { reactive } from "vue";

const store = reactive({
    apiBaseUrl: 'http://127.0.0.1:8000/api',
    apiUrls: {
        homepage: '/homepage',
        orders: '/order',
        restaurant: '/restaurant'
        },
    restaurants: [],
    //typologies array
    typologies: [],
    // typologies array from selection for filer the api calls
    selectedTypologies: [],
    // Indexes of products in cart in local storage
    indexes: [],
    //checked value for typologies
    cartProducts: [],
    finalPrice: 0,
    deliveryCost: 0,
})

export default store;