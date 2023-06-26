<script>
export default {
    name: 'ProductCard',
    props: {
        product: Object
    }
}
</script>

<template>
    <!-- product card -->
    <div id="product-card" class="row mb-3 bg-light p-2 align-items-center text-dark">
        <!-- col details -->
        <div class="col py-3">
            <h3 class="mb-3">{{ product.name }}</h3>
            <div class="d-flex justify-content-between">
                <div>
                    <span class="fw-bold">€ {{ product.price }}</span>
                    <span class="fw-bold ms-3">{{ product.discount }}</span>
                    <p class="badge rounded-pill py-2 px-3 text-light">Ingredienti</p>
                </div>
                <div class="actions">
                    <button>+</button>
                </div>
                <!--<p>{{ product.ingredients 
                    v-if="(product.discount !== 0)"
                    }}</p>-->
            </div>
        </div>
        <!-- /col details -->
        <!-- col image -->
        <div id="img-container" class="col-3">
            <img src="https://picsum.photos/300/200" class="img-fluid" :alt="product.name">
        </div>
        <!-- /col image -->
    </div>
    <!-- product card -->
</template>

<style lang="scss">
@use '../assets/scss/_partials/variables' as *;

#product-card {
    border: 2px solid #e7e7e7;

    .badge {
        background-color: $ms_secondary_color;
        cursor: pointer;
    }
}
</style>