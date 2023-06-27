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
            <img class="img-fluid rounded" src="https://picsum.photos/500/300" :alt=" restaurant.name ">
        </div>
        <div class="col-sm-12 col-md-9 py-3">
            <h3 class="mb-3">{{ restaurant.name }}</h3>
            <div class="d-flex justify-content-between">
                <div>
                    <small class="me-2 badge text-bg-info" v-for="typology in restaurant.typologies">{{ typology.name }}</small>
                </div>
                <div>
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid fa-phone"></i>
                        <span class="info-text">Telefono: € {{ restaurant.phone_number}}</span>
                        <span>-</span>
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

.row {
    color: black;
    text-decoration: none;
    width: max(100%,25rem);

    cursor: pointer;
        &:hover {
            -webkit-box-shadow: 6px 15px 25px 6px rgba(0,0,0,0.4); 
            box-shadow: 6px 15px 25px 6px rgba(0,0,0,0.4);
        }
        
    img {
        aspect-ratio: 16/9;
        object-fit: contain;
        display: block;
    }
    .info-text {
        font-size: 0.75rem;
    }

}

@media (min-width: 576px) {
    .row{
        .info-text {
        font-size: 1rem;
        }
    }
    
}
</style>