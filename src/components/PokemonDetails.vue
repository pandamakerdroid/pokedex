<template>
<div class="py-5 px-10 w-full">
  <span>{{$filters.capitalizeFirstCharacter(pokemonDetails.name)}}</span>
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
          picture: any,
          abilities: Array<object>
          stats:any
          possibleEvolutions: Array<string>
          moves:any
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
          this.pokemonDetails.abilities=response.data.abilities;
          this.pokemonDetails.name=response.data.name;
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