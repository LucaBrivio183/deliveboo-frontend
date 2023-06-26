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
    },
}
</script>

<template>
    <div class="d-flex justify-content-center h-100" :class="{ 'clicked': this.isActive }" id="typology-card">
        <input class="d-none" type="checkbox" :value="typology.id" :id="typology.name"
            v-model="store.selectedTypologies" @change="this.isActive = !this.isActive">
        <label class="d-flex flex-column align-items-center p-2" :for="typology.name" :name="typology.name">
            <img class="img-fluid" src="https://picsum.photos/100/50" :alt="typology.name">
            <small>{{ typology.name }}</small>
        </label>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
@use '../assets/scss/_partials/_variables' as *;

#typology-card {
    cursor: pointer;
    border-radius: 5px;
    border: 2px solid white;

    &:hover{
        border: 2px solid $ms_primary_color;
    }
    label {
        cursor: pointer;
        img{
            aspect-ratio: 16/9;
            object-fit: contain;
            display: block;
            border-radius: 5px;
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

@media (min-width: 576px) {
    small {
        font-size: .75rem;
    }
}
</style>