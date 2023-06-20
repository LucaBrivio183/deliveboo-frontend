<script>
//libraries
import axios from 'axios';
//function
import { store } from './store';
//components
export default {
  name: 'App',
  components: {
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

<template></template>

<style lang="scss" scoped>
@use './assets/scss/main.scss' as *;
</style>
