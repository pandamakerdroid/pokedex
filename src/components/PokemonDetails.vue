<template>
<div class="py-5 px-10 w-full">
  <span class="text-4xl">{{$filters.capitalizeFirstCharacter(pokemonDetails.name)}}</span>
</div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useStore } from '../store'
export default defineComponent({
  name: 'PokemonDetails',
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
      }
  },
  computed: {
    newPokemonDetailsUrl():string{
      return this.store.getters.pokemonDetailsUrl;
    }
  },
  methods: {
    retrievePokemonDetails(){
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