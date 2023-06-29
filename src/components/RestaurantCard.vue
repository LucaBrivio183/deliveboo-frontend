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
    <router-link class="restaurant-card row flex-no-wrap rounded" :to="{ name: 'restaurant', params: { slug: restaurant.slug } }" > 
        <div class="col-sm-12 col-md-3 img-container">
            <img class="restaurant-img w-100 p-1" :src="restaurant.image" :alt="restaurant.name ">
        </div>
        <div class="col-sm-12 col-md-9 py-3">
            <h3 class="mb-3">{{ restaurant.name }}</h3>
            <div class="row flex-no-wrap">
                <div class="col-12 col-md-4 p-1">
                    <small class="me-2 badge text-bg-info" v-for="typology in restaurant.typologies">{{ typology.name }}</small>
                </div>
                <div class="col-12 col-md-8 p-2">
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid fa-location-dot d-none d-sm-block"></i>
                        <span class="info-text d-none d-sm-block">Indirizzo: {{ restaurant.address}}</span>
                        <i class="fa-solid fa-clock"></i>
                        <span class="info-text">Orari di consegna: {{ restaurant.business_times }}</span>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid fa-money-bill-wave"></i>
                        <span class="info-text">Consegna: € {{ restaurant.delivery_cost }}</span>
                        <span>-</span>
                        <span class="info-text">Ordine Minimo: € {{ restaurant.min_purchase }}</span>
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;

.restaurant-card {
    color: black;
    text-decoration: none;

    .img-container {

        .restaurant-img {
            aspect-ratio: 3/2;
            object-fit: cover;
        }
    }

    cursor: pointer;
        &:hover {
            -webkit-box-shadow: 2px 2px 7px 3px rgba(255,140,178,0.8); 
            box-shadow: 2px 2px 7px 3px rgba(255,140,178,0.8);
        }
    
    .info-text {
        font-size: 0.75rem;
    }

}

@media only screen and (width>= 576px) {
    .row{
        .info-text {
            font-size: .875rem;
        }
    }
}

@media only screen and (width>= 992px) {
    .row{
        height: 12.5rem;
        .info-text {
            font-size: 1rem;

            }
    }
    
}



</style>