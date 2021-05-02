<template>
  <div :class="{'bg-green-500':!isInitialized}" class="h-screen col-span-12 lg:col-span-10 bg-gray-100 overflow-y-scroll">
    <div v-if="!isInitialized" class="h-full w-full">
      <img src="@assets/pokedex-background.svg" class="object-cover	fixed opacity-5 h-full w-auto lg:h-auto lg:w-full"/>
      <div class="bg-gradient-to-r from-green-500 to-green-500 h-screen">
        <div class="w-full left-0 top-0 p-6 p-16 md:p-32">
          <div class="flex justify-between">
            <div>
              <h1 class="text-3xl font-bold">
                <img src="@assets/pokedex2.svg" class="h-36">
              </h1>
              <span>Ways to view Pokémons</span>
            </div>
            <div>
              <ul class="lg:flex">
                <li class="ml-24">
                    <div class="flex items-center justify-end">
                      <div class="w-10 border-b border-solid border-white"></div>
                        <h1 class="ml-3 text-3xl font-bold">1</h1>
                    </div>
                    <div class="text-right">Click on a Pokémon<br>in the list</div>
                </li>
                <li class="ml-24">
                    <div class="flex items-center justify-end">
                      <div class="w-10 border-b border-solid border-white"></div>
                        <h1 class="ml-3 text-3xl font-bold">2</h1>
                    </div>
                    <div class="text-right">Search for a Pokémon<br><strong>id</strong> || <strong>name</strong></div>
                </li>
                <li class="ml-24">
                    <div class="flex items-center justify-end">
                      <div class="w-10 border-b border-solid border-white"></div>
                        <h1 class="ml-3 text-3xl font-bold">3</h1>
                    </div>
                    <div class="text-right">Click on an avatar in the<br>evolution card</div>
                </li>

                <li class="ml-24">
                    <div class="flex items-center justify-end">
                      <div class="w-10 border-b border-solid border-white"></div>
                        <h1 class="ml-3 text-3xl font-bold">4</h1>
                    </div>
                    <div class="text-right">View the Pokémon!</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pl-20 md:pl-32 lg:pl-40 text-left text-white">
            <span class="font-bold uppercase tracking-widest">A simple</span>
            <h1 class="text-5xl lg:text-7xl font-bold text-gray-800">
              Poké<br/>Dex
            </h1>
            <p class="font-bold mb-1">Find all pokémons</p>
            <p>And their details including<br>evolutions and moves</p>
        </div> 
        <div class="absolute right-0 bottom-0 pb-16 pr-16 md:pr-40 lg:pr-32 text-white opacity-75">
          <p class="font-bold mb-1">Author</p>
          <p>Simin Cao</p>
        </div>     
      </div>
    </div>
    <div v-if="isInitialized" class="md:flex no-wrap px-5 pt-4 md:pt-2 md:-mx-2 ">
          <!-- Left Side -->
          <div class="w-full md:w-3/12 md:mx-2">
              <!-- Basic Info Card -->
              <div class="bg-white p-3 border-t-4 border-green-400">
                  <div class="image overflow-hidden">
                      <pokemon-image :images="pokemonDetails.sprites"/>
                  </div>
                  <h1 class="text-gray-900 font-bold text-xl leading-8 mt-1">{{$filters.capitalizeFirstCharacter(pokemonDetails.name)}}</h1>
                  <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">ID: {{pokemonDetails.id}}</p>
                  <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">Order: {{pokemonDetails.order}}</p>
                  <ul
                      class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                      <li class="flex items-center py-2">
                          <span v-for="type in pokemonDetails.types" :key="type.slot"  
                                v-pokemon-type="type.type.name">
                            {{$filters.capitalizeFirstCharacter(type.type.name)}}
                          </span>
                      </li>
                      <li v-for="(ability,index) in pokemonDetails.abilities" :key="ability.slot" class="flex items-center py-2">
                          <span>Ability {{index+1}}: {{$filters.capitalizeFirstCharacter(ability.ability.name)}}</span>
                      </li>
                  </ul>
              </div>
              <!-- End of Basic Info card -->
              <div class="my-4"></div>
              <!-- Evolution card -->
              <div class="bg-white p-3 h-60 h-max-60">
                  <pokemon-evolution :speciesUrl="pokemonDetails.speciesUrl"/>
              </div>
              <!-- End of Evolution card -->
          </div>
          <!-- Right Side -->
          <div class="pb-4 pt-4 md:pt-0 w-full md:w-9/12 md:mx-2 h-full md:h-64">
              <!-- stats Section -->
              <div class="bg-white p-3 shadow-sm rounded-sm  mb-4">
                  <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                      <i class="fas fa-dumbbell text-green-500"></i>
                      <span class="tracking-wide">Stats</span>
                  </div>
                    <table class="min-w-full">
                      <thead>
                          <tr class="bg-gray-100 text-sm font-medium text-gray-700 text-center">
                              <th class="px-4 py-2">Type</th>
                              <th class="px-4 py-2">Base Stat</th>
                              <th class="px-4 py-2">Effort</th>
                          </tr>
                      </thead>
                      <tbody class="text-sm font-normal text-gray-700 overflow-y-scroll">
                        <tr v-for="stat in pokemonDetails.stats" :key="stat.stat.name"
                            class="hover:bg-gray-100 border-b border-gray-200 py-10">
                            <td class="px-4 py-3">{{$filters.capitalizeFirstCharacter(stat.stat.name)}}</td>
                            <td class="px-4 py-3">{{stat.base_stat}}</td>
                            <td class="px-4 py-3">{{stat.effort}}</td>
                        </tr>
                      </tbody>
                  </table>
              </div>
              <!-- End of stats section -->

              <!-- move section -->
                <pokemon-move :moves="pokemonDetails.moves"/>
          </div>
          <!-- End of Right Side -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../store'
import PokemonImage from '@components/PokemonImage.vue'
import PokemonMove from '@components/PokemonMove.vue'
import PokemonEvolution from '@components/PokemonEvolution.vue'
export default defineComponent({
  name: 'PokemonDetail',
    components: {
    'pokemon-image': PokemonImage,
    'pokemon-move': PokemonMove,
    'pokemon-evolution': PokemonEvolution
  },
  data: () => {
      const store=useStore();
      interface PokemonDetail{
          id: number,
          name: string,
          types: Array<PokemonType>,
          order: number,
          sprites: Array<object>,
          abilities: Array<PokemonAbility>,
          stats:Array<PokemonStat>
          speciesUrl: string,
          moves:Array<object>,
      };
      interface PokemonType{
        slot:number,
        type:{
          name:string,
          url:string,
        }
      };
      interface PokemonAbility{
        slot:number,
        ability:{
          name:string,
          url:string,
        }
      };
      interface PokemonStat{
        base_stat:number,
        effort:number,
        stat:{
          name:string,
          url:string
        }
      }
      return{
          store,
          pokemonDetailsUrl: '',
          pokemonDetails:{} as PokemonDetail,
          isInitialized:false
      }
  },
  computed: {
    newPokemonDetailsUrl():string{
      return this.store.getters.getPokemonDetailsUrl;
    }
  },
  methods: {
    retrievePokemonDetails(){
      if(this.store.getters.getPokemonDetailsUrl==='' || !this.store.getters.getPokemonDetailsUrl){
        this.isInitialized=false;
        return;
      }
      this.axios
      .get(this.store.getters.getPokemonDetailsUrl)
      .then(response => {
          this.pokemonDetails={
            id:response.data.id,
            name:response.data.name,
            abilities:response.data.abilities,
            sprites:response.data.sprites,
            order:response.data.order,
            types:response.data.types,
            moves:response.data.moves,
            stats:response.data.stats,
            speciesUrl:response.data.species.url
          };
          this.isInitialized=true;
      });
    }
  },
  watch: {
    newPokemonDetailsUrl (newPokemonDetailsUrl, oldPokemonDetailsUrl) {
      if(newPokemonDetailsUrl && newPokemonDetailsUrl!==oldPokemonDetailsUrl){
        this.pokemonDetailsUrl=newPokemonDetailsUrl;
        this.retrievePokemonDetails();
      }
      else{
        return;
      }
      
    }
  },
  setup: () => {
  }
})
</script>