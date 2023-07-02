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
    <footer class="mt-3">
        <!-- nav up -->
        
        <div class="p-3 navbar navbar-expand-md navbar-light shadow-sm bg-dark">
            <div class="container px-5">
                <div class="row gy-5">
                    <div class="col-lg-4">
                        <div class="social-links">
                            <h6 class="mb-4">ABOUT</h6>
                            <p class="text-light">Deliveboo è una società Italiana di consegna a domicilio di cibo, fondata online nel 2023 da Vittorio Corradi, Luca Brivio, Eugenia Rossi, Giorgia Galbulli Cavazzini e Vittoria Romano. Opera nella città di Roma e periferia.</p>    
                        </div>
                    </div>
                    <div class="col-lg-6 ms-auto">
                        <h6 class="mb-4">CONTATTACI</h6>
                        <p class="mb-1 text-light"><i class="fa-solid fa-phone"></i> : (03) 9283 4726</p>
                        <p class="mb-1 text-light"><i class="fa-solid fa-envelope"></i> : enquiries@mill.co</p>
                        <p class="mb-0 text-light"><i class="fa-solid fa-location-dot"></i> : 14 Paramore Street Mornington Peninsula Victoria 3552</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- /nav up -->
        <!-- nav down -->
        <nav id="nav" class="navbar navbar-expand-md navbar-light shadow-sm bg-dark">
            <div class="container px-5">
                <div class="d-flex w-100">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav me-auto flex-row align-items-center" id="socials">
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
                    <ul class="navbar-nav ml-auto d-flex align-items-center">
                        <li class="nav-item">
                                <!-- logo -->
                                <LogoElement />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- /nav down -->
    </footer>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
@use '../assets/scss/_partials/variables' as *;

footer {
    
        font-size: small;

        #nav {
        border-top: 2px solid $ms_primary_color;
        color:$ms_primary_color ;
        #socials {
            a {
                color: $ms_primary_color;
            }
        }
    }
    .logo {
            :deep(img) {
                height: 1.5rem;
                width: 1.25rem;
            }
        }
}
</style>