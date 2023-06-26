<script>
// logo element
import LogoElement from './LogoElement.vue';

export default {
    name: 'AppHeader',
    components: {
        LogoElement
    }
}
</script>

<template>
    <header>
        <!-- nav -->
        <nav id="nav" class="navbar navbar-expand-md navbar-light shadow-sm">
            <div class="container">
                <!-- toggle -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="toggle">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <!-- /toggle -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item mx-1">
                            <!-- home -->
                            <router-link :to="{ name: 'home' }" class="nav-link">
                                Home
                            </router-link>
                        </li>
                    </ul>
                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- authentication -->
                        <li class="nav-item">
                            <a href="http://127.0.0.1:8000/" class="nav-link">Collabora con noi</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- /nav -->
        <!-- jumbotron -->
        <div class="jumbotron">
            <div class="container d-flex flex-column">
                <div class="d-flex justify-content-center justify-content-lg-between">

                    <!-- content -->
                    <div class="content align-self-center d-none d-lg-flex mt-5 ms-5">
                        <img src="/images/pinkburger.png" alt="food" class="me-3">
                        <h4 class="align-self-end mb-3 fst-italic">I tuoi piatti preferiti <br>direttamente a casa tua</h4>
                    </div>
                    <!-- /content -->

                    <!-- logo -->
                    <router-link id="title-logo" :to="{ name: 'home' }"
                        class="navbar-brand d-flex align-items-center my-4 me-5">
                        <!-- title -->
                        <div class="me-3 mb-5">
                            <h1>DeliveBoo</h1>
                        </div>
                        <!-- logo image -->
                        <!--<LogoElement class="logo" /> /////////////// sistemare -->
                        <!-- logo image -->
                        <div id="logo" class="logo_deliveboo d-flex align-items-center me-lg-5">
                            <img src="/images/logo-green.png" alt="logo">
                        </div>
                    </router-link>
                    <!-- /logo -->
                </div>

                <!-- search -->
                <div id="search-container" class="w-25 align-self-center">
                    <!-- search input -->
                    <div class="search rounded bg-dark">
                        <form class="form-inline d-flex rounded">
                            <input class="form-control mr-sm-2" type="search" placeholder="Trova i ristoranti">
                            <button class="btn text-light my-2 my-sm-0" type="button"
                                placeholder="Trova i ristoranti">Cerca</button>
                        </form>
                    </div>
                    <!-- /search input -->
                </div>
                <!-- /search -->
            </div>
        </div>
        <!-- /jumbotron -->
    </header>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
@use '../assets/scss/_partials/variables' as *;

#nav {
    background-color: $ms_secondary_color_light;
    border-bottom: 2px solid $ms_primary_background;
    color: $ms_secondary_color;

    a:hover {
        color: $ms_primary_background;
    }
}

.jumbotron {
    background-image: url("/images/header-background-green.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-color: $ms_primary_color_light;

    .content {
        img {
            max-width: 15.625rem;
        }
    }

    h1 {
        color: $ms_secondary_color;
        font-weight: bolder;
    }

    #logo {
        img {
            max-height: 18.125rem;
        }

        /*
        :deep(img) {
            height: 15.625rem;
        }*/
    }
}
</style>