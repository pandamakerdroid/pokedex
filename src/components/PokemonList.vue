<template>
<ul v-if="isInitialized">
    <li v-for="(pokemon, index) in response.data.results" :key="pokemon.name">
        {{index+1}} {{pokemon.name}}
    </li>
</ul>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'PokemonList',
  props: {
    msg: {
      type: String,
      required: false
    }
  },
  setup: () => {
    const count = ref(0)
    return { count }
  },
  data: () => {
      interface PokemonApiUrl{
          baseUrl: string,
          pokemonPath: string,
          pokemonQueryLimit: string
          pokemonCount: number
      }
      return{
          isInitialized:false,
          pokemonApiUrl: {
            baseUrl: import.meta.env.VITE_BASE_URL,
            pokemonPath: import.meta.env.VITE_PATH_POKEMON,
            pokemonQueryLimit: import.meta.env.VITE_QUERY_LIMIT_POKEMON,
            pokemonCount:0
          } as PokemonApiUrl,
          pokemonQueryAmount:[25,50,75,100],
          response:{}
      }
  },
mounted () {
    this.axios
      .get(this.pokemonApiUrl.baseUrl+
            this.pokemonApiUrl.pokemonPath+
            this.pokemonApiUrl.pokemonQueryLimit+
            this.pokemonQueryAmount[0])
      .then(response => {
          this.response=response;
          this.isInitialized = true;
      })
      .catch(
        function (error) {
          console.log(error)
          return Promise.reject(error)
      });
  }
})
</script>