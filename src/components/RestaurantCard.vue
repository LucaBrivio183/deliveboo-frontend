<script>
//components
export default {
    name: 'RestaurantCard',
    props: {
        restaurant: Object,
    },
    components: {
    },
    data() {
        return {

        }
    },
    created() {

    }
}
</script>

<template>
    <router-link class="col-sm-12 col-md-6 col-4 ">
            <div class=""> <img class="img-fluid" :src="restaurant.image" :alt="restaurant.name"></div>
            <h3 class="card-title">{{ restaurant.name }}</h3>
    </router-link>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;

router-link {
    padding: 13px;

    div {
        overflow: hidden;
        max-height: 200px;

        img {
            object-fit: center;
        }
    }

    h3 {
        font-size: .75rem;
        line-height: .875rem;
        padding: .75rem 0;
    }
}
</style>