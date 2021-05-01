<template>
  <div class="grid grid-cols-12 bg-gray-100">
    <pokemon-list/>
    <pokemon-detail/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PokemonList from './components/PokemonList.vue'
import PokemonDetail from './components/PokemonDetail.vue'

export default defineComponent({
  name: 'App',
  components: {
    'pokemon-list':PokemonList,
    'pokemon-detail':PokemonDetail
    }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
