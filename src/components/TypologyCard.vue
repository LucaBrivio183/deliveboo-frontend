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
    <div class="h-100" :class="{ 'clicked': store.selectedTypologies.includes(typology.id) }" id="typology-card">
        <input class="d-none" type="checkbox" :value="typology.id" :id="typology.name"
            v-model="store.selectedTypologies">
        <label class="h-100 w-100 p-2" :for="typology.name" :name="typology.name" >
            <img class="w-100 h-70 rounded" :src="typology.image" :alt="typology.name">
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
            object-fit: cover;
            aspect-ratio: 3/2;
        }
        small {
            font-size: .75rem;
            text-align: center;
        }
    }
}
.clicked{
    border: 2px solid $ms_secondary_color !important; // background and dark text
}

@media only screen and (width>= 576px) {
    #typology-card {
        label {
            small {
                font-size: .875rem;
            }
        }
    }
}

@media only screen and (width>= 768px) {
    #typology-card {
        label {
            small {
                font-size: 1rem;
            }
        }
    }
}
</style>