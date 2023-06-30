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
  <PageLoader v-if="store.loading"/>
  <AppHeader v-if="!['payment'].includes($route.name)" />
  <router-view ></router-view>
  <AppFooter v-if="!['payment'].includes($route.name)" />
</template>

<style lang="scss" scoped>
@use './assets/scss/main.scss' as *;



</style>
