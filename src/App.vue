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

<template>
  <h1>ciao</h1>
  <a class="btn btn-primary" href="#" role="button">Link</a>

</template>

<style lang="scss" scoped>
@use './assets/scss/main.scss' as *;
</style>
