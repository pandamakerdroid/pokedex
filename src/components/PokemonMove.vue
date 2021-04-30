<template>
  <div class="bg-white p-3 shadow-sm rounded-sm h-96">
      <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
        <i class="far fa-hand-rock text-green-500"></i>
        <span class="tracking-wide">Moves</span>
      </div>
      <div class="h-72 overflow-y-auto">
        <table class="table-auto border-collapse w-full">
          <thead>
            <tr class="bg-gray-100 text-sm font-medium text-gray-700 text-center">
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Type</th>
              <th class="px-4 py-2">Category</th>
              <th class="px-4 py-2">Power</th>
              <th class="px-4 py-2">Accuracy</th>
              <th class="px-4 py-2">PP</th>
            </tr>
          </thead>
          <tbody class="text-sm font-normal text-gray-700 overflow-y-scroll">
            <tr v-for="moveDetail in pokemonMovesDetail" :key="moveDetail.name"
            class="hover:bg-gray-100 border-b border-gray-200 py-10">
              <td class="px-4 py-4">{{$filters.capitalizeFirstCharacter(moveDetail.name)}}</td>
              <td class="px-4 py-4"><span v-pokemon-type="moveDetail.type">{{$filters.capitalizeFirstCharacter(moveDetail.type)}}</span></td>
              <td class="px-4 py-4">{{$filters.capitalizeFirstCharacter(moveDetail.category)}}</td>
              <!--replaceNullNumber filter not applied due to likely a Vue internals bug
              Unhandled error during execution of scheduler flush. This is likely a Vue internals bug. 
              Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-next -->
              <td class="px-4 py-4">{{moveDetail.power}}</td>
              <td class="px-4 py-4">{{moveDetail.accuracy}}</td>
              <td class="px-4 py-4">{{moveDetail.pp}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- End of Move card -->
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'PokemonMove',
    props: {
      moves: {
        type: Array,
        required: true,
      }
    },
    data () {
      interface PokemonMoveDetail {
        name: string,
        accuracy: number,
        power: number,
        pp: number,
        type: string,
        category:string
      };
      interface PokemonMove{
        move:{
          name:string
          url:string
        }
      }
      return {
        pokemonMovesDetail:[] as PokemonMoveDetail[],
        PokemonMoves:this.moves as PokemonMove[],
        PokemonMoveDetail:{} as PokemonMoveDetail,
        isInitialized:false,
      }
    },
    mounted() {
      this.PokemonMoves.forEach(move => {
        this.axios
          .get(move.move.url)
          .then(response => {
            this.pokemonMovesDetail.push({
              name:response.data.name,
              accuracy:response.data.accuracy,
              power:response.data.power,
              pp:response.data.pp,
              type:response.data.type.name,
              category:response.data.damage_class.name
            });
          });
        this.isInitialized=true;
      });
    }
  })
</script>