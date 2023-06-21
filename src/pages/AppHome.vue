<script>
//libraries
import axios from 'axios';
//function
import { store } from '../store';
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
    <main>
        <div class="container">
            <h1 class="mt-5 mb-3">Scelti per te</h1>
            <div class="row gy-2">
                <div class="col-4 p-2">
                    
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as *;
</style>
