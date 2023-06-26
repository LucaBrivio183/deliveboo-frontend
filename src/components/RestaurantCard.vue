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
    <router-link class="row py-3 rounded" :to="{ name: 'restaurant', params: { slug: restaurant.slug } }"> 
        <div class="col-sm-12 col-md-3">
            <img class="img-fluid rounded" src="https://picsum.photos/500/300" :alt="restaurant.name">
        </div>
        <div class="col-sm-12 col-md-9 py-3">
            <h3 class="mb-3">{{ restaurant.name }}</h3>
            <div class="d-flex justify-content-between">
                <div>
                    <span class="me-2 badge text-bg-info" v-for="typology in restaurant.typologies">{{ typology.name }}</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span class="me-2">consegna: € {{ restaurant.delivery_cost }}</span>
                    <span class="me-2">-</span>
                    <span class="me-2">Ordine Minimo: € {{ restaurant.min_purchase }}</span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;

.row {
    color: black;
    text-decoration: none;

    cursor: pointer;
        &:hover {
            box-shadow: .3125rem .3125rem .9375rem 0px rgba(0,0,0,0.75);
        }

    img {
        aspect-ratio: 16/9;
        object-fit: contain;
        display: block;
    }

    span: {
        font-size: .875rem;
    }
}
</style>