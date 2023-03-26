import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store.js'

import ElementPlus from 'element-plus'
import { icon, clickOutside, focus } from './directives.js'
import 'element-plus/dist/index.css'
import './assets/sass/style.scss'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.directive('icon', icon)
app.directive('clickOutside', clickOutside)
app.directive('focus', focus)

app.mount('#app')
