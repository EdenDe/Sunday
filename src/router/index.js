import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginSignup from '../views/LoginSignup.vue'
import BoardIndex from '../views/BoardIndex.vue'
import BoardDetails from '../views/BoardDetails.vue'
import TaskPulses from '../views/TaskPulses.vue'
import KabanDetails from '../views/KabanDetails.vue'
import BoardTable from '../views/BoardTable.vue'
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
			path: '/board',
			name: 'boardIndex',
			component: BoardIndex,
			children: [
				{
					path: ':boardId',
					name: 'board',
					component: BoardDetails,
					children: [
						{
							path: 'main-table',
							name: 'table',
							component: BoardTable,
						},
						{
							path: 'kaban',
							name: 'kaban',
							component: KabanDetails,
						},
					],
				},
			],
		},
	],
})

export default router
