<script>
export default {
    name: 'ProductsCart',
}
</script>

<template>
    <div class="bg-secondary">
        <div class="bg-success p-4 text-center ">
            <div><i class="fa-solid fa-cart-shopping fs-1"></i></div>
            <h1 class="text-center">Il tuo Carrello</h1>
        </div>
        <!-- agiungere i v-for="(product, index) in store.indexes"> -->
        <div class="overflow-y-scroll items">
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item 1
            </div>
            <div class="bg-light p-3 m-2">
                Item ultimo
            </div>
        </div>
        <div class="bg-light p-3 m-2">
            Consegna:
        </div>
        <div class="bg-light p-3 m-2">
            Totale:
        </div>

        <div class="text-center m-2">
            <a href="#" class="btn btn-success">Ordina!</a>
        </div>
    </div>
</template>

<style scoped>
.items{
    max-height: 400px;
}
</style>