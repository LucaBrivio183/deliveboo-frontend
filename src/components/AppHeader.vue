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
                            <router-link :to="{ name: 'home' }" class="nav-link d-flex">
                                <div class="home-img-container position-relative">
                                    <img class="img-home logo-green position-absolute" src="/images/logo-green.png" alt="logo">
                                    <img class="img-home logo-azure position-absolute" src="/images/logo-azure.png" alt="logo">
                                </div>
                                Home
                            </router-link>
                        </li>
                    </ul>
                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- authentication -->
                        <li class="nav-item">
                            <a href="http://127.0.0.1:8000/" class="nav-link">
                                <i class="fa-solid fa-utensils"></i>
                                Accedi o registrati</a>
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

header {
    position: sticky;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;

    #nav {
        background-color: $ms_secondary_color_light;
        border-bottom: 2px solid $ms_primary_background;
        color: $ms_secondary_color;

        .img-home {
            max-height: 1.75rem;
        }

        a:hover {
            color: $ms_primary_background;
        }
    }
}

.home-img-container {
    width: 1.25rem;
}
.logo-azure {
    opacity: 0;
    transition: opacity 0.2s;
}

.nav-link {
    &:hover .logo-green {
        opacity: 0;
        transition: opacity 0.2s;
    }

    &:hover .logo-azure {
        opacity: 1;
        transition: opacity 0.2s;
    }
}
</style>