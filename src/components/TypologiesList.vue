<script>
//libraries
import axios from 'axios';
//function
import store from '../store';
//components
//import TypologyCard from './TypologyCard.vue';
import TypologyCard from './TypologyCard.vue';

export default {
    name: 'TypologiesList',
    components: {
        TypologyCard
    },
    data() {
        return {
            store,

        }
    },
    methods: {
        getTypologies() {
            axios.get('http://127.0.0.1:8000/api/homepage/typologies')
                .then((response) => {
                    this.store.typologies = response.data.results;
                })
        }
    },
    created() {
        this.getTypologies();
    }
}
</script>

<template>
    <section>
            <div class="container my-3">
                <div class="row">
                    <div v-for="typology in store.typologies" class="col-2 align-self-stretch">
                        <TypologyCard :typology="typology" @change="$emit('getRestaurants')" />
                    </div>
                </div>
            </div>
        </section>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
@use '../assets/scss/_partials/variables' as *;

aside {
    border-right: 2px solid $ms_primary_background;

    #menu {
        color: white;
    }
}
</style>