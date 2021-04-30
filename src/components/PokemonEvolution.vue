<template>
  <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
    <i class="fas fa-sync-alt text-green-500"></i>
    <span>Evolution</span>
  </div>
  <div class="grid grid-cols-3 max-h-48 overflow-y-scroll">
    <div v-for="pokemon in pokemonEvolutionChain" :key="pokemon.name" 
    class="text-center my-2 cursor-pointer"
    v-on:click="setPokemonName(pokemon.name)">
      <img 
      :class="pokemon.isSelf ? 'border-4 border-green-400' : 'border-4'"
      class="h-12 w-12 rounded-full mx-auto hover:bg-gray-100" 
          v-lazy="{ src: pokemon.imageUrl, 
                  loading: 'https://craftypixels.com/placeholder-image/100x100/ffffff/ffffff', 
                  error: 'your error image url' }" 
          alt="">
      <span class="text-sm">{{$filters.capitalizeFirstCharacter(pokemon.name)}}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useStore } from '../store'
  export default defineComponent({
    name: 'PokemonEvolution',
    props: {
      speciesUrl: {
        type: String,
        required: true,
      }
    },
    data () {
      interface PokemonEvolutionChain {
        name: string,
        spieciesUrl: string,
        imageUrl: string,
        isSelf:boolean
      };
      return {
        pokemonEvolutionChain:[] as PokemonEvolutionChain[],
        pokemonEvolutionChainUrl:'',
        isInitialized:false,
        store:useStore(),
      }
    },
    async mounted() {
      try {
        const response = await this.axios.get(this.speciesUrl);
        this.pokemonEvolutionChainUrl=response.data.evolution_chain.url;
      } catch (error) {
        console.error(error);
      }   
      try {
        const response = await this.axios.get(this.pokemonEvolutionChainUrl);
        let data=response.data.chain;
        this.pushToPokemonEvolutionChainArray(data);
        data=data.evolves_to;
        data.forEach((firstRevolutions:any) => {
          this.pushToPokemonEvolutionChainArray(firstRevolutions);
          firstRevolutions=firstRevolutions.evolves_to;
          firstRevolutions.forEach((secondRevolution:any) => {
            this.pushToPokemonEvolutionChainArray(secondRevolution);
          });
        });
      } catch (error) {
        console.error(error);
      }  
    },
    methods: {
      setPokemonName(name:string){
        this.store.commit({type:'setPokemonName', name:name})
      },
      pushToPokemonEvolutionChainArray(data:any){
        this.pokemonEvolutionChain.push({
              name:data.species.name,
              spieciesUrl:data.species.url,
              imageUrl:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.species.url.split("/").slice(-2)[0]}.png`,
              isSelf: (data.species.url===this.speciesUrl?true:false)
        });
      }
    }
  })
</script>