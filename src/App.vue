<script>
//libraries
import axios from 'axios';
//function
import store from './store';
//components
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import PageLoader from './components/PageLoader.vue';

export default {
  name: 'App',
  components: {
    PageLoader,
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      store
    }
  },
  mounted() {
    store.loading = false;
  }
}
</script>

<template>

  <AppHeader />
  <PageLoader v-if="store.loading"/>
  <router-view :key="$route.fullPath" ></router-view>
  <AppFooter />
</template>

<style lang="scss" scoped>
@use './assets/scss/main.scss' as *;



</style>
