import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Workspace from '../views/Workspace.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			// path: '/',
			// name: 'home',
			// component: HomeView,
		},
		{
			path: '/',
			name: 'workspace',
			component: Workspace,
		},
	],
})

export default router
