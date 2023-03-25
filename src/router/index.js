import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginSignup from '../views/LoginSignup.vue'
import BoardIndex from '../views/BoardIndex.vue'
import BoardKanban from '../views/BoardKanban.vue'
import BoardTable from '../views/BoardTable.vue'
import TaskPulse from '../views/TaskPulse.vue'

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
			//redirect: '/board/:boardId/main-table',
			name: 'boardIndex',
			component: BoardIndex,
			children: [
				{
					path: 'main-table',
					name: 'table',
					component: BoardTable,
					children: [
						{
							path: 'pulse/:taskId',
							name: 'pulse',
							component: TaskPulse,
						},
					],
				},
				{
					path: 'kanban',
					name: 'kanban',
					component: BoardKanban,
				},
			],
		},
	],
})

export default router
