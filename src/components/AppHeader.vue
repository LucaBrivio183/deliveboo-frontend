<script>
// logo element
import LogoElement from './LogoElement.vue';

export default {
    name: 'AppHeader',
    components: {
        LogoElement
    },
    data() {
        return {

        }
    },
    created() {

    }
}
</script>

<template>
    <header>
        <!-- nav -->
        <nav id="nav" class="navbar navbar-expand-md navbar-light shadow-sm">
            <div class="container">
                <router-link :to="{ name: 'home' }" class="navbar-brand d-flex align-items-center">
                    <!-- logo -->
                    <LogoElement />
                    <div class="ms-3 me-3">
                        <h3>DeliveBoo</h3>
                    </div>
                </router-link>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="toggle">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item mx-1">
                            <!-- home -->
                            <router-link :to="{ name: 'home' }" class="nav-link text-light">
                                Home
                            </router-link>
                        </li>
                        <!-- search input -->
                        <!--
                        <li class="nav-item d-flex align-items-center">
                            <div class="search mx-0 mx-md-3">
                                <div class="search-input-container">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                    <input type="text" placeholder="Cerca ristorante">
                                </div>
                            </div>  
                        </li> 
                        -->
                        <!-- /search input -->
                    </ul>
                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- authentication -->
                        <li class="nav-item">
                            <a href="http://127.0.0.1:8000/" class="nav-link text-light">Collabora con noi</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- /nav -->
    </header>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
@use '../assets/scss/_partials/variables' as *;

#nav {
    background-color: $ms_secondary_color_medium;
    border-bottom: 2px solid #68fcff;

    h3 {
        color: $ms_primary_color;
    }
}
</style>