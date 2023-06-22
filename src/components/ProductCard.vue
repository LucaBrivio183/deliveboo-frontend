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
    <div class="ms-card d-flex justify-content-between p-3">
        <!-- Product detail -->
        <div class="ms-card-body me-3">
            <h2 class="card-title mb-2 fs-3">{{ product.name }}</h2>
            <div class="mb-2" v-show="product.description">{{ product.description }}</div>
            <div class="card-text">{{ product.price }} €</div>
        </div>
        <!-- /Product detail -->
        <!-- Product image -->
        <div class="ms-card-image">
            <img src="https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80" class="h-100" alt="prodotto">
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
        width: 100%;
        height: 100%;
        max-height: 12.5rem;

        &:hover {
            box-shadow: .3125rem .3125rem .9375rem 0px rgba(0,0,0,0.75);
        }

        .ms-card-body {
            // height: 100%;
        }

        .ms-card-image {
            width: 9.375rem;
            flex-shrink: 0;
            overflow: hidden;

            img {
                height: 100%;
            }
        }
    }
</style>