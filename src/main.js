import {
  createApp
} from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/global.css'
import '@/assets/css/tailwind.css'

createApp(App).use(router).use(store).mount('#app')