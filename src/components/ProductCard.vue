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
    <div class="ms-card d-flex h-100">
        <!-- Product detail -->
        <div class="ms-card-body w-50 p-3">
            <h2 class="card-title mb-2 fs-3">{{ product.name }}</h2>
            <!-- <div class="mb-2" v-show="product.description">{{ product.description }}</div> -->
            <div class="card-text">{{ product.price }} €</div>
        </div>
        <!-- /Product detail -->
        <!-- Product image -->
        <div class="ms-card-image w-50">
            <img :src="product.image" class="img-fluid h-100" :alt="product.name">
        </div>
        <!-- /Product image -->
    </div>
    <!-- /Product card -->
</template>

<style lang="scss">
    .ms-card {

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

        .ms-card-image {
            overflow: hidden;
            object-fit: center;
            img {
                border-top-right-radius: .3125rem;
                border-bottom-right-radius: .3125rem;
            }
        }
    }
</style>