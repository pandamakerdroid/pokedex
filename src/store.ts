// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
  pokemonDetailsUrl: string
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    pokemonDetailsUrl: ''
  },
  mutations: {
      changePokemonDetailUrl(state, payload){
        state.pokemonDetailsUrl = payload.url;
      }
  }
})

export function useStore () {
    return baseUseStore(key)
}