<template>
  <div v-if="isMenuMinimized" @click="isMenuMinimized = false" 
    class="motion-safe:animate-spin mt-3 ml-3 cursor-pointer rounded-full shadow h-10 w-10 fixed lg:hidden z-20 bg-green-400 hover:bg-green-500 text-white hover:text-gray-100">
    <i class=" mt-3 fas fa-bars"></i>
  </div>
  <div v-if="!isMenuMinimized" class=" z-10 fixed lg:relative bg-white h-screen overflow-y-auto shadow rounded h-min-40 col-span-2">
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
    <div class="fixed lg:hidden rounded-full bg-green-400 shadow h-10 w-10 left-64 top-96
                hover:bg-green-500 text-gray-100 cursor-pointer"
          @click="isMenuMinimized=true">
      <i class="fas fa-compress-alt mt-3 text-white"></i>
    </div>
    <div class="h-full flex flex-col">
      <div class="h-12 mb-1 bg-green-400 shadow w-full">
        <input v-model="searchCriteria" 
        placeholder="Search" 
        class="rounded-lg my-2 py-1 px-2 shadow w-11/12 md:w-5/6"/>
      </div>
      <ul class="px-3 overflow-y-scroll" id="pokemon-list">
          <li v-for="pokemon in filteredPokemons" :key="pokemon.name" :id="String(getPokemonId(pokemon.url))"
          :class="{ 'bg-green-400 text-white shadow': selectedPokemon == getPokemonId(pokemon.url) }"
          class="py-3 px-2 grid grid-cols-12 border-b border-gray-200 rounded cursor-pointer
                hover:bg-gray-100 hover:shadow hover:text-gray-800"
          v-on:click="setPokemonDetailsUrl(pokemon.url);selectPokemon(getPokemonId(pokemon.url))">
              <div class="text-right col-span-3 block">
                <span class="left-0 text-sm md:text-md">{{getPokemonId(pokemon.url)}}</span> 
              </div>
              <span class="mt-1 pl-3 col-span-9 text-left text-sm md:text-md">{{$filters.capitalizeFirstCharacter(pokemon.name)}}</span>
          </li>
      </ul>
    </div>
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
    newPokemon():number{
      return this.store.getters.getPokemonId;
    },
    filteredPokemons():Array<any> {
      return this.retrievedPokemons.filter(pokemon => {
         return (pokemon.name.indexOf(this.searchCriteria.toLowerCase()) > -1 ||
                 String(this.getPokemonId(pokemon.url)).indexOf(this.searchCriteria.toLowerCase()) > -1)
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
          id:number,
          name:string,
          url:string
      }
      return{
          page: 0,
          isMenuMinimized:true,
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
          searchCriteria:'',
          selectedPokemon:0,
          tailwind : {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            "2xl": 1536
          }
    }
  },
mounted () {
    let _this = this;
    window.innerWidth<_this.tailwind.lg?_this.isMenuMinimized=true:_this.isMenuMinimized=false;
    window.addEventListener('resize', function () {
      //TODO: use vue-screen return tailwind size vocabulary when supports vue3 better
      window.innerWidth<_this.tailwind.lg?_this.isMenuMinimized=true:_this.isMenuMinimized=false;
    });
  },
  methods: {
    getPokemonId(url:string) {
      return Number(url.split("/").slice(-2)[0]);
    },
    selectPokemon(id:number){
      this.selectedPokemon=id;
    },
    setPokemonDetailsUrl(url:string){
      this.store.commit({type:'setPokemonDetailUrl', url:url})
    },
    infiniteHandler($state: any):void {
      this.axios.get(this.pokemonApiUrl.baseUrl+
          this.pokemonApiUrl.pokemonPath, {
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
  },
  watch: {
    newPokemon (newId, oldId) {
      if(newId && newId!==oldId){
        this.selectPokemon(newId);
        const scrollTo=this.$el.querySelector("[id='"+newId+"']").scrollIntoView();
        let pokemon:any = this.retrievedPokemons.find(x => this.getPokemonId(x.url) == newId);
        this.setPokemonDetailsUrl(pokemon.url);
      }
      else{
        return;
      }
      
    }
  },
})
</script>