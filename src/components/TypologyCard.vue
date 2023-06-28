<script>

import store from '../store';
//components
export default {
    name: 'TypologyCard',
    data() {
        return {
            store,
        }
    },
    props: {
        typology: Object,
    },
    methods: {

    }
}
</script>

<template>
    <div class="d-flex justify-content-center h-100" :class="{ 'clicked': store.selectedTypologies.includes(typology.id) }" id="typology-card">
        <input class="d-none" type="checkbox" :value="typology.id" :id="typology.name"
            v-model="store.selectedTypologies">
        <label class="d-flex w-100 flex-column align-items-center p-2" :for="typology.name" :name="typology.name" >
            <img class="img-fluid rounded" src="https://picsum.photos/100/50" :alt="typology.name">
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
    border: 2px solid rgba(white,0);

    &:hover{
        border: 2px solid $ms_primary_color;
    }
    label {
        cursor: pointer;
        img{
            aspect-ratio: 16/9;
            object-fit: contain;
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

@media (min-width: 576px) {
    small {
        font-size: .75rem;
    }
}
</style>