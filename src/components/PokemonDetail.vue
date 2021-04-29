<template>
<div v-if="isInitialized" class="container md:h-full mx-auto px-5 pt-2">
        <div class="md:flex no-wrap md:-mx-2 ">
            <!-- Left Side -->
            <div class="w-full md:w-3/12 md:mx-2">
                <!-- Profile Card -->
                <div class="bg-white p-3 border-t-4 border-green-400">
                    <div class="image overflow-hidden">
                        <pokemon-image :images="pokemonDetails.sprites"/>
                    </div>
                    <h1 class="text-gray-900 font-bold text-xl leading-8 mt-1">{{$filters.capitalizeFirstCharacter(pokemonDetails.name)}}</h1>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">ID: {{pokemonDetails.id}}</p>
                    <ul
                        class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li class="flex items-center py-3">
                            <span>Order: {{pokemonDetails.order}}</span>
                        </li>
                        <li v-for="type in pokemonDetails.types" :key="type.slot" class="flex items-center py-3">
                            <span>Type {{type.slot}}: {{$filters.capitalizeFirstCharacter(type.type.name)}}</span>
                        </li>
                        <li v-for="(ability,index) in pokemonDetails.abilities" :key="ability.slot" class="flex items-center py-3">
                            <span>Ability {{index+1}}: {{$filters.capitalizeFirstCharacter(ability.ability.name)}}</span>
                        </li>
                    </ul>
                </div>
                <!-- End of profile card -->
                <div class="my-4"></div>
                <!-- Friends card -->
                <div class="bg-white p-3 hover:shadow">
                    <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                        <span class="text-green-500">
                            <svg class="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </span>
                        <span>Evolution</span>
                    </div>
                    <div class="grid grid-cols-3">
                        <div class="text-center my-2">
                            <img class="h-16 w-16 rounded-full mx-auto"
                                src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                                alt="">
                            <a href="#" class="text-main-color">Kojstantin</a>
                        </div>
                        <div class="text-center my-2">
                            <img class="h-16 w-16 rounded-full mx-auto"
                                src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                                alt="">
                            <a href="#" class="text-main-color">James</a>
                        </div>
                        <div class="text-center my-2">
                            <img class="h-16 w-16 rounded-full mx-auto"
                                src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                alt="">
                            <a href="#" class="text-main-color">Natie</a>
                        </div>
                    </div>
                </div>
                <!-- End of friends card -->
            </div>
            <!-- Right Side -->
            <div class="w-full md:w-9/12 mx-2 h-64">
                <!-- Profile tab -->
                <!-- About Section -->
                <div class="bg-white p-3 shadow-sm rounded-sm">
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

                <div class="my-4"></div>

                <!-- move and education -->
                <pokemon-move v-if="isInitialized" :moves="pokemonDetails.moves"/>
                <!-- End of profile tab -->
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../store'
import PokemonImage from './PokemonImage.vue'
import PokemonMove from './PokemonMove.vue'

export default defineComponent({
  name: 'PokemonDetail',
    components: {
    'pokemon-image': PokemonImage,
    'pokemon-move': PokemonMove
  },
  data: () => {
      const store=useStore();
      interface PokemonDetail{
          id: number,
          name: string,
          types: Array<PokemonType>,
          order: number,
          sprites: Array<object>,
          abilities: Array<object>,
          stats:Array<PokemonStat>
          species: string,
          moves:Array<object>,
      };
      interface PokemonType{
        slot:number,
        type:{
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
      return this.store.getters.pokemonDetailsUrl;
    }
  },
  methods: {
    retrievePokemonDetails(){
      this.isInitialized=false;
      if(this.store.getters.pokemonDetailsUrl===''){
        return;
      }
      this.axios
      .get(this.store.getters.pokemonDetailsUrl)
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
            species:response.data.species.url
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