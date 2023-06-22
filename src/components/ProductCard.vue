<script>
export default {
    name: 'ProductCard',
    props: {
        product: Object
    }
}
</script>

<template>
    <!-- Product card -->
    <div class="card h-100">
        <!-- Product image -->
        
        <img :src="product.image" class="card-img-top h-50" :alt="product.name">
        <!-- /Product image -->
        <!-- Product detail -->
        <div class="card-bodyp-3">
            <h2 class="card-title mb-2 fs-3">{{ product.name }}</h2>
            <!-- <div class="mb-2" v-show="product.description">{{ product.description }}</div> -->
            <div class="card-text">{{ product.price }} €</div>
        </div>
        <!-- /Product detail -->
    </div>
    <!-- /Product card -->
</template>

<style lang="scss">
    .card {

        border: .0625rem solid #bbb;
        border-radius: .3125rem;
        cursor: pointer;
        max-height: 200px;

        &:hover {
            box-shadow: .3125rem .3125rem .9375rem 0px rgba(0,0,0,0.75);
        }

        .ms-card-body {
            // height: 100%;
        }
    }
</style>