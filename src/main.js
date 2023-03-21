import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store.js'

import ElementPlus from 'element-plus'

import { icon } from './directives.js'
import './assets/sass/style.scss'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.directive('icon', icon)

app.mount('#app')
