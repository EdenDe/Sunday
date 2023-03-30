import { createRouter, createWebHistory } from 'vue-router'
import { store } from '../store/store'
import HomePage from '../views/HomePage.vue'
import LoginSignup from '../views/LoginSignup.vue'
import BoardIndex from '../views/BoardIndex.vue'
import BoardKanban from '../views/BoardKanban.vue'
import BoardTable from '../views/BoardTable.vue'
import Pulse from '../views/Pulse.vue'
import Dashboard from '../views/Dashboard.vue'
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage,
		},
		{
			path: '/login-signup',
			name: 'loginSignup',
			component: LoginSignup,
		},
		{
			path: '/board/:boardId',
			name: 'boardIndex',
			component: BoardIndex,
			meta: { requiresAuth: true },
			children: [
				{
					path: 'main-table',
					name: 'table',
					component: BoardTable,
					children: [
						{
							path: 'pulse/:taskId?',
							name: 'pulse',
							component: Pulse,
						},
					],
				},
				{
					path: 'kanban',
					name: 'kanban',
					component: BoardKanban,
				},
				{
					path: 'dashboard',
					name: 'dashboard',
					component: Dashboard,
				},
			],
		},
	],
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(route => route.meta.requiresAuth)) {
		if (!sessionStorage.getItem('loggedinUser')) {
			next({
				name: 'loginSignup',
				query: { redirect: to.fullPath },
			})
		}
	}
	next()
})

export default router
