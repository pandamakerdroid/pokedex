import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import './index.css'
import { store, key } from './store'
import filters from './helpers/Filters'

const app = createApp(App);
app.use(VueAxios, axios);
app.use(store, key)
app.config.globalProperties.$filters=filters;
app.mount('#app');


