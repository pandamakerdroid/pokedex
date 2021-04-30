<template>
  <div class="h-screen overflow-y-auto shadow col-span-2">
    <infinite-loading @infinite="infiniteHandler" class="text-xs" >
      <template #spinner>
        <span class="pl-3 col-span-9 text-left mt-2 fixed bottom-0 left-7">
        Loading Pokemons..
        </span>
      </template>
      <template #no-more>
        <span class="pl-3 col-span-9 text-left hidden">
        All Pokemons loaded
        </span>
      </template>
      <template #no-results>
        <span class="pl-3 col-span-9 text-left">                      
          No result found
        </span>
      </template>
    </infinite-loading>
    <div class="fixed h-12 bg-green-400 shadow w-2/12">
      <input v-model="searchCriteria" 
      placeholder="Search" 
      class="rounded-lg mt-2 py-1 px-2 shadow"/>
    </div>
    <ul class="mt-12 px-3">
        <li v-for="pokemon in filteredPokemons" :key="pokemon.name"
        class="py-3 px-2 grid grid-cols-12 border-b border-gray-200"
        v-on:click="setPokemonDetailsUrl(pokemon.url)">
            <div class="text-right col-span-3">
              <span class="left-0 ">{{pokemon.url.split("/").slice(-2)[0]}}</span> 
            </div>
            <span class="pl-3 col-span-9 text-left">{{$filters.capitalizeFirstCharacter(pokemon.name)}}</span>
        </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../store'
import InfiniteLoading from 'infinite-loading-vue3-ts';

export default defineComponent({
  name: 'PokemonList',
  props: {
  },
  components: {
    InfiniteLoading,
  },
  setup: () => {
  },
  computed: {
    filteredPokemons():Array<Object> {
      return this.retrievedPokemons.filter(pokemon => {
         return (pokemon.name.indexOf(this.searchCriteria.toLowerCase()) > -1 ||
                 pokemon.url.split("/").slice(-2)[0].indexOf(this.searchCriteria.toLowerCase()) > -1)
      });
    }
  },
  data: () => {
      interface PokemonApiUrl{
          baseUrl: string,
          pokemonPath: string,
          pokemonQueryLimit: string,
          pokemonQueryOffset: string
      }
      interface Pokemon{
          name:string,
          url:string
      }
      return{
          page: 0,
          isInitialized:false,
          store:useStore(),
          pokemonApiUrl: {
            baseUrl: import.meta.env.VITE_BASE_URL,
            pokemonPath: import.meta.env.VITE_PATH_POKEMON,
            pokemonQueryLimit: import.meta.env.VITE_QUERY_LIMIT_POKEMON,
            pokemonQueryOffset: import.meta.env.VITE_QUERY_OFFSET_POKEMON
          } as PokemonApiUrl,
          pokemonQueryAmount:[50,75,100],
          retrievedPokemons:[] as Pokemon[],
          pokemonCount:0,
          searchCriteria:''
    }
  },
mounted () {
  },
  methods: {
    filterPokemonList(){
      console.log(this.searchCriteria)
    },
    setPokemonDetailsUrl(url:string){
      this.store.commit({type:'setPokemonDetailUrl', url:url})
    },
    infiniteHandler($state: any):void {
      this.axios.get(this.pokemonApiUrl.baseUrl+
          this.pokemonApiUrl.pokemonPath+
          this.pokemonApiUrl.pokemonQueryLimit+
          this.pokemonQueryAmount[0] , {
        params: {
          limit: this.pokemonQueryAmount[0],
          offset: (this.page * this.pokemonQueryAmount[0]),
        },
      }).then(({ data }) => {
        this.pokemonCount= this.pokemonCount==0? data.count:this.pokemonCount;
        if (data.next) {
          this.page += 1;
          this.retrievedPokemons.push(...data.results);
          
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
  }
})
</script>