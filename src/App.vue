<script>
//libraries
import axios from 'axios';
//function
import store from './store';
//components
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
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
  <AppHeader :key="$route.fullPath" />
  <router-view :key="$route.fullPath" ></router-view>
  <AppFooter :key="$route.fullPath" />
</template>

<style lang="scss" scoped>
@use './assets/scss/main.scss' as *;



</style>
