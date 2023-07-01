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
            <div class="container-fluid py-2">
                <div class="row flex-nowrap py-2">
                    <div v-for="typology in store.typologies" class="col-6 col-sm-4 col-md-3 col-lg-2">
                        <TypologyCard :typology="typology" @change="$emit('getRestaurants')"/>
                    </div>
                </div>
            </div>
        </section>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
@use '../assets/scss/_partials/_variables' as *;
section {
    background-color: $ms_secondary_color_light;
    border-bottom: 2px solid $ms_primary_background;
    border-top: 2px solid $ms_primary_background;
    .container-fluid{
        .row{
            overflow-y: scroll;
            &::-webkit-scrollbar {
                background-color: transparent;
                visibility: hidden;
                width: 0;
            }
            &::-webkit-scrollbar-thumb {
                background-color: transparent;
                visibility: hidden;
                width: 0;
            }
            &::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0);
            }
        }
        .row:hover {
            &::-webkit-scrollbar {
                visibility: visible;
            }
            &::-webkit-scrollbar-thumb {
                background-color: $ms_primary_color_light;
                visibility: visible;
            }
        }       
    }

}

</style>