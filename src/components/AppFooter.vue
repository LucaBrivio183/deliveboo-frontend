<script>
// logo element
import LogoElement from './LogoElement.vue';

export default {
    name: 'AppFooter',
    components: {
        LogoElement
    }
}

</script>

<template>
    <footer>
        <!-- nav -->
        <nav id="nav" class="navbar navbar-expand-md navbar-light shadow-sm bg-dark">
            <div class="container px-5">
                <div class="collapse navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav me-auto" id="socials">
                        <li class="nav-item mx-1">
                            <a href="#">
                                <i class="fa-brands fa-twitter"></i>
                            </a>
                        </li>
                        <li class="nav-item mx-1">
                            <a href="#">
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>
                        </li>
                        <li class="nav-item mx-1">
                            <a href="#">
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- authentication -->
                        <li class="nav-item">
                            <router-link :to="{ name: 'home' }" class="navbar-brand d-flex align-items-center">
                                <!-- logo -->
                                <LogoElement />
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- /nav -->
    </footer>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
@use '../assets/scss/_partials/variables' as *;

#nav {
    border-top: 2px solid $ms_primary_color;

    #socials {
        a {
            color: $ms_primary_color;
        }
    }

    .logo {
        :deep(img) {
            height: 2.125rem;
            width: 1.875rem;
        }
    }
}
</style>