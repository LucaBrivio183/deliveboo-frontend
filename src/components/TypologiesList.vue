<script>
//libraries
import axios from 'axios';
//function
import store from '../store';
//components
import TypologyCard from './TypologyCard.vue';

export default {
    name: 'TypologiesList',
    components: {
        TypologyCard,
    },
    data() {
        return {
            store,
            typologies: [],
        }
    },
    methods:{
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
        <section class="px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100  mt-3">
                <a href="#" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Preferenze?</span>
                </a>
                <form>
                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li v-for="typology in typologies" class="nav-item text-white mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" :value="typology.id" :id="typology.name" v-model="store.selectedTypologies" @change="$emit('getRestaurants')">
                                <label class="form-check-label" :for="typology.name" :name="typology.name">{{ typology.name}}</label>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        </section> 
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
@use '../assets/scss/_partials/variables' as *;

aside {
    border-right: 2px solid $ms_primary_background;

    #menu{
        color:white;
    }
}

</style>