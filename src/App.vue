<script>
//libraries
import axios from 'axios';
//function
import store from './store';
//components
import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppSidebar,
    AppFooter,
  },
  data() {
    return {
      store
    }
  },
  created() {

  }
}
</script>

<template>
  <AppHeader />
  <main class="d-flex">
    <AppSidebar />
    <router-view class="flex-grow-1"></router-view>
  </main>
  <AppFooter />
</template>

<style lang="scss" scoped>
@use './assets/scss/main.scss' as *;



</style>
