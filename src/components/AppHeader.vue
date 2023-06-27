<script>
// logo element
import LogoElement from './LogoElement.vue';

export default {
    name: 'AppHeader',
    components: {
        LogoElement,
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
                            <a href="http://127.0.0.1:8000/" class="nav-link">Accedi o registrati</a>
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
    background-color: $ms_secondary_color_light;
    border-bottom: 2px solid $ms_primary_background;
    color: $ms_secondary_color;

    a:hover {
        color: $ms_primary_background;
    }
}
</style>