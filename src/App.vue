<script>
//libraries
import axios from 'axios';
//function
import store from './store';
//components
import AppHeader from './components/AppHeader.vue';
import AppSidebardVue from './components/AppSidebard.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppSidebardVue,
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
  <AppSidebardVue/>
  <router-view></router-view>
  <AppFooter />
</template>

<style lang="scss" scoped>
@use './assets/scss/main.scss' as *;
</style>
