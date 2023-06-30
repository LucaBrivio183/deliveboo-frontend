<script>
//function
import store from '../store';
//components
export default {
    name: 'PageLoader',
    data() {
        return {
            store,       
        }
    },
    // mounted() {
    //     document.onreadystatechange = () => {
    //         if(document.readyState == 'complete') {
    //             store.loading = false;
    //         }
    //     }
    // }

}
</script>

<template>
    <div class="page-loader">
        <img class="loader" src="https://i.pinimg.com/originals/6e/74/ba/6e74ba45548276f3e0a1043e0cf38207.gif" alt="logo">
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
@use '../assets/scss/_partials/_variables.scss' as *;

.page-loader {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;

}

</style>