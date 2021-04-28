<template>
<div class="h-screen overflow-y-auto shadow">
    <div class="absolute">ABC</div>
    <ul v-if="isInitialized" class=" md:w-48 px-3">
        <li v-for="(pokemon, index) in response.data.results" :key="pokemon.name"
        class="py-3 px-2 flex flex-col-3 border-b border-gray-200">
            <i class="fas fa-hashtag mt-1 mr-1"></i>
            <span class="pr-3 ">{{index+1}}</span> 
            <span class="pl-3 ">{{$filters.capitalizeFirstCharacter(pokemon.name)}}</span>
        </li>
    </ul>
</div>
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