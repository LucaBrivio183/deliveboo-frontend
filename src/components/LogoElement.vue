<script>
//components
export default {
    name: 'Logo'
}
</script>

<template>
    <div class="logo">
        <!-- logo -->
        <div class="logo_deliveboo">
            <img src="/images/logo-pink-cut.png" alt="logo" id="logo_cut">
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;


#logo_cut {
        height: 3.125rem;
        width: 2.6875rem;
    }
</style>