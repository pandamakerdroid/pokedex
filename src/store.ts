// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
  pokemonDetailsUrl: string
  pokemonId: number
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    pokemonDetailsUrl: '',
    pokemonId: 0
  },
  getters: {
    getPokemonDetailsUrl: state => state.pokemonDetailsUrl,
    getPokemonId: state => state.pokemonId,
  },
  mutations: {
      setPokemonDetailUrl(state, payload){
        state.pokemonDetailsUrl = payload.url;
      },
      setPokemonId(state, payload){
        state.pokemonId = payload.id;
      }
  }
})

export function useStore () {
    return baseUseStore(key)
}