// vuex.d.ts
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import filters from './filters'
declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    pokemonDetailsUrl: string
    pokemonName: string
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
    $filters: typeof filters
  }

  // declare global filters
}