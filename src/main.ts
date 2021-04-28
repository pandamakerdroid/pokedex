import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import './index.css'
import filters from './helpers/filters'

const app = createApp(App);
app.use(VueAxios, axios);
app.config.globalProperties.$filters=filters;
app.mount('#app');


