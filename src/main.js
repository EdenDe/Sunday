import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store.js'

import ElementPlus from 'element-plus'
import { icon, clickOutside } from './directives.js'
import 'element-plus/dist/index.css'
import './assets/sass/style.scss'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(FloatingVue)
app.directive('icon', icon)
app.directive('clickOutside', clickOutside)
app.component('QuillEditor', QuillEditor)

app.mount('#app')
