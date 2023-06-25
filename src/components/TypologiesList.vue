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
            typologies: [],
        }
    },
    methods: {
        getTypologies() {
            axios.get('http://127.0.0.1:8000/api/homepage/typologies')
                .then((response) => {
                    this.typologies = response.data.results;
                    console.log(this.typologies);
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
            <div class="container py-3">
                <div class="row">
                    <div v-for="typology in typologies" class="col-2">
                        <TypologyCard :typology="typology" @change="$emit('getRestaurants')" />
                    </div>
                </div>
            </div>
        </section>
        <!--
    <section class="bg-dark">
        <div class="container d-flex flex-column align-items-center px-3 pt-2 text-white mt-3">
            <a href="#" class="text-white my-3 text-decoration-none">
                <span class="fs-5 d-none d-sm-inline">Preferenze?</span>
            </a>

            <form class="w-100 px-5">
                <ul class="nav nav-pills align-items-center justify-content-between bg-success" id="menu">
                    <li v-for="typology in typologies" class="nav-item text-white">
                        <TypologyCard :typology="typology" @change="$emit('getRestaurants')"/>
                        
                    </li>
                </ul>
            </form>
        </div>
    </section>-->
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