<template>
<div v-if="isInitialized" class="py-5 px-10 w-full bg-gray-100">
  <span class="text-4xl">{{$filters.capitalizeFirstCharacter(pokemonDetails.name)}}</span>
  <div v-for="type in pokemonDetails.types" :key="type.slot">Type {{type.slot}}: {{$filters.capitalizeFirstCharacter(type.type.name)}}</div>
  <div >Order: {{pokemonDetails.order}}</div>
  <span></span>
  <pokemon-image :images="this.pokemonDetails.sprites"/>
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../store'
import PokemonImage from './PokemonImage.vue'

export default defineComponent({
  name: 'PokemonDetail',
    components: {
    'pokemon-image':PokemonImage
  },
  data: () => {
      const store=useStore();
      interface PokemonDetails{
          name: string,
          types: Array<object>,
          order: number,
          sprites: Array<object>,
          abilities: Array<object>,
          stats:Array<object>
          species: string,
          moves:Array<object>,
      }
      return{
          store,
          pokemonDetailsUrl: '',
          pokemonDetails:{} as PokemonDetails,
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