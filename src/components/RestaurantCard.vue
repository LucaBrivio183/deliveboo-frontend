<script>
//components
export default {
    name: 'RestaurantCard',
    props: {
        restaurant: Object,
    },
}
</script>

<template>
    <router-link class="card h-100" :to="{ name: 'restaurant', params: { slug: restaurant.slug } }"> 
        <img class="card-img-top" :src="restaurant.image" :alt="restaurant.name">
        <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <div class="d-flex justify-content-between align-item-center">
                <p class="card-text px-1">{{ restaurant.business_times }}</p>
                <p class="card-text fs-5">&#x2022;</p>
                <p class="card-text px-1">Consegna: {{ restaurant.delivery_cost }} €</p>
            </div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;

.card {
    
    text-decoration: none;
    overflow: hidden;
    max-height: 200px;
    cursor: pointer;
        &:hover {
            box-shadow: .3125rem .3125rem .9375rem 0px rgba(0,0,0,0.75);
        }

    img {
        object-fit: center;
    }
    .card-body {
        .card-title {
            padding: .75rem 0;
            font-weight: bold;
        }
    }
}
</style>