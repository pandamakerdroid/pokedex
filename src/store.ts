// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
  pokemonDetailsUrl: string
  pokemonName: string
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    pokemonDetailsUrl: '',
    pokemonName: ''
  },
  getters: {
    getPokemonDetailsUrl: state => state.pokemonDetailsUrl,
    getPokemonName: state => state.pokemonName,
  },
  mutations: {
      setPokemonDetailUrl(state, payload){
        state.pokemonDetailsUrl = payload.url;
      },
      setPokemonName(state, payload){
        state.pokemonName = payload.name;
      }
  }
})

export function useStore () {
    return baseUseStore(key)
}