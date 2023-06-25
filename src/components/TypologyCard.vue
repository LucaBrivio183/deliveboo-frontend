<script>

import store from '../store';
//components
export default {
    name: 'TypologyCard',
    data() {
        return {
            store,
            typologies: [],
            clickedCard: false,
        }
    },
    props: {
        typology: Object,
    },
}
</script>

<template>
    <div class="d-flex justify-content-center" :class="{ 'bg-success': this.clickedCard }" id="typology-card" @click="this.clickedCard = !this.clickedCard">
        <input class="d-none" type="checkbox" :value="typology.id" :id="typology.name"
            v-model="store.selectedTypologies">
        <label class="d-flex flex-column justify-content-center align-items-center" :for="typology.name" :name="typology.name">
            <img class="img-fluid" src="https://picsum.photos/100/50" :alt="typology.name">
            <small>{{ typology.name }}</small>
        </label>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
@use '../assets/scss/_partials/_variables' as *;

div{
    cursor: pointer;
    &:hover{
        border: 2px solid $ms_primary_color;
    }
    label {
        cursor: pointer;
        img{
            aspect-ratio: 3/2;
            object-fit: contain;
            display: block;
        }
        small {
            display: block;
        }
    }
}
.clicked{
    border: 2px solid $ms_secondary_color; // background and dark text

}
</style>