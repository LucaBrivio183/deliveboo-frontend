<script>

import store from '../store';
//components
export default {
    name: 'TypologyCard',
    data() {
        return {
            store,
            isActive: false,
        }
    },
    props: {
        typology: Object,
    }
}
</script>

<template>
    <div class="d-flex justify-content-center h-100 rounded" :class="{ 'clicked': this.isActive }" id="typology-card">
        <!-- invisible checkbox for faster response on research -->
        <input class="d-none" type="checkbox" :value="typology.id" :id="typology.name"
            v-model="store.selectedTypologies" @change="this.isActive = !this.isActive">
        <!-- label shown for make checkbox clickable like card -->
        <label class="d-flex flex-column align-items-center p-2" :for="typology.name" :name="typology.name">
            <img class="img-fluid rounded" src="https://picsum.photos/100/50" :alt="typology.name">
            <small>{{ typology.name }}</small>
        </label>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
@use '../assets/scss/_partials/variables' as *;

div{
    border: 2px solid rgba($color: white, $alpha: 0);
    &:hover{
        border: 2px solid $ms_primary_color;
    }
    img{
        aspect-ratio: 3/2;
        object-fit: contain;
        display: block;
    }
    label {
        cursor: pointer;
        img{
            object-fit: cover;
            display: block;
        }
        small {
            display: block;
            font-size: .75rem;
        }
    }
}
.clicked{
    border: 2px solid $ms_secondary_color !important; // background and dark text
}

@media screen and (width <= 576px) {
    small {
        font-size: .875rem;
    }
}
</style>