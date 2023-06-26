import { reactive } from "vue";

const store = reactive({
    apiBaseUrl: 'http://127.0.0.1:8000/api',
    apiUrls: {
        homepage: '/homepage',
        restaurant: '/restaurant'
        },
    restaurants: [],
    selectedTypologies: [],
    // Indexes of products in cart in local storage
    indexes: [],
})

export default store;