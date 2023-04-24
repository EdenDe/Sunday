import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store.js'

import ElementPlus from 'element-plus'
import {
	icon,
	clickOutside,
	clickOutsideParent,
	focus,
} from './directives.js'
import 'element-plus/dist/index.css'
import './assets/sass/style.scss'

import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

import VueConfetti from 'vue-confetti'

const app = createApp(App)

app.use(VueConfetti)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(FloatingVue)
app.directive('icon', icon)
app.directive('clickOutside', clickOutside)
app.directive('clickOutsideParent', clickOutsideParent)
app.directive('focus', focus)

app.config.unwrapInjectedRef = true

app.mount('#app')
