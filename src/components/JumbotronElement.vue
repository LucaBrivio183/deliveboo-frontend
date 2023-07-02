<script>
// logo element
import LogoElement from './LogoElement.vue';

export default {
    name: 'JumbotronElement',
    components: {
        LogoElement
    }
}
</script>

<template>
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
                <div id="title-logo"
                    class="navbar-brand d-flex align-items-center my-4 me-5">
                    <!-- title -->
                    <div class="me-3 mb-5">
                        <h1 class="m-0 p-0">Flamin<mark>Goo</mark></h1>
                    </div>
                    <!-- logo image -->
                    <div id="logo" class="logo_deliveboo d-flex align-items-center me-lg-5">
                        <img src="/images/logo-green.png" alt="logo">
                    </div>
                </div>
                <!-- /logo -->
            </div>
        </div>
    </div>
    <!-- /jumbotron -->
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
@use '../assets/scss/_partials/variables' as *;

.jumbotron {
    background-image: url("/images/jumbotron-background.svg");
    background-size: cover;
    background-position: center;
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

        mark{
            color: $ms_primary_color;
            background: none;
        }
    }

    #logo {
        img {
            max-height: 18.125rem;
        }
    }
}

</style>