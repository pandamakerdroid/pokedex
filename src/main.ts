import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import './index.css'
import { store, key } from './store'
import filters from './helpers/Filters'
import VueLazyLoad from 'vue3-lazyload'
import { PokemonType } from './directives/pokemon-type'

const app = createApp(App);
app.directive('pokemon-type', PokemonType);
app.use(VueAxios, axios);
app.use(store, key);
app.config.globalProperties.$filters=filters;
app.use(VueLazyLoad, {
    loading: () => {
        console.log('loading')
      },
      error: () => {
        console.log('error')
      },
      loaded: () => {
        console.log('loaded')
      }
  });
app.mount('#app');


