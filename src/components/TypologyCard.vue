<script>

import store from '../store';
//components
export default {
    name: 'TypologyCard',
    data() {
        return {
            store,
            typologies: [],
        }
    },
    props: {
        typology: Object,
    }
}
</script>

<template>
    <div id="typology-card" class="form-check d-flex flex-column h-100">
        <input class="form-check-input d-none" type="checkbox" :value="typology.id" :id="typology.name"
            v-model="store.selectedTypologies">
        <label class="form-check-label" :for="typology.name" :name="typology.name">
            <img class="img-fluid" src="https://picsum.photos/100/50" :alt="typology.name">
        <small>{{ typology.name }}</small>
        </label>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
@use '../assets/scss/_partials/variables' as *;

div{
    img{
        aspect-ratio: 3/2;
        object-fit: contain;
        display: block;
    }
    small {
        display: block;
    }
}
</style>