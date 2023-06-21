<script>
//libraries
import axios from 'axios';
//function
import { store } from '../store';
//components
export default {
    name: 'AppSidebar',
    components: {
    },
    data() {
        return {
            store,
            typologies: [],
        }
    },method:{
        getTypologies() {
            axios.get(this.store.apiBaseUrl + this.store.apiUrls.homepage)
                .then((response) => {
                    this.typologies = typologies.data.results;
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
  <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="#" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Preferenze?</span>
                </a>
                <form action="get">
                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li v-for="typology in typepologies" class="nav-item text-white mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                    {{ typology.name }}
                                </label>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        </div> 
    </div>
</div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
#menu{
    color:white;
}
</style>