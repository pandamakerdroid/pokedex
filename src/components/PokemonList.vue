<template>
<div class="h-screen overflow-y-auto shadow">
    <i class="fas fa-chevron-left text-2xl absolute "></i>
    <ul v-if="isInitialized" class=" md:w-64 px-3">
        <li v-for="(pokemon, index) in retrievedPokemons" :key="pokemon.name"
        class="py-3 px-2 flex flex-col-3 border-b border-gray-200"
        v-on:click="setPokemonDetailsUrl(pokemon.url)">
            <i class="fas fa-hashtag mt-1 mr-1"></i>
            <span class="pr-3 ">{{index+1}}</span> 
            <span class="pl-3 ">{{$filters.capitalizeFirstCharacter(pokemon.name)}}</span>
        </li>
    </ul>
</div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useStore } from '../store'

export default defineComponent({
  name: 'PokemonList',
  props: {
    msg: {
      type: String,
      required: false
    }
  },
  setup: () => {
  },
  data: () => {
      interface PokemonApiUrl{
          baseUrl: string,
          pokemonPath: string,
          pokemonQueryLimit: string
      }
      interface Pokemon{
          name:string,
          url:string
      }
      return{
          isInitialized:false,
          store:useStore(),
          pokemonApiUrl: {
            baseUrl: import.meta.env.VITE_BASE_URL,
            pokemonPath: import.meta.env.VITE_PATH_POKEMON,
            pokemonQueryLimit: import.meta.env.VITE_QUERY_LIMIT_POKEMON,
          } as PokemonApiUrl,
          pokemonQueryAmount:[50,75,100],
          retrievedPokemons:{} as Pokemon[],
          pokemonCount:0
    }
  },
mounted () {
    this.axios
      .get(this.pokemonApiUrl.baseUrl+
            this.pokemonApiUrl.pokemonPath+
            this.pokemonApiUrl.pokemonQueryLimit+
            this.pokemonQueryAmount[0])
      .then(response => {
          this.retrievedPokemons=response.data.results;
          this.pokemonCount=response.data.count
          this.isInitialized = true;
      })
      .catch(
        function (error) {
          console.log(error)
          return Promise.reject(error)
      });
  },
  methods: {
      setPokemonDetailsUrl(url:string){
        this.store.commit({type:'setPokemonDetailUrl', url:url})
      },
  }
})
</script>