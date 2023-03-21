import { taskService } from '../services/task.service.js'

export const taskStore = {
	state: {
		tasks: [],
	},
	mutations: {
		setTasks(state, { tasks }) {
			state.tasks = tasks
		},
		addTask(state, { task }) {
			state.tasks.push(task)
		},
		updateTask(state, { task }) {
			const idx = state.tasks.findIndex(t => t._id === task._id)
			state.tasks.splice(idx, 1, task)
		},
		removeTask(state, { taskId }) {
			state.tasks = state.tasks.filter(task => task._id !== taskId)
		},
	},
	getters: {
		tasksToDisplay({ tasks }) {
			return tasks
		},
	},
	actions: {
		async loadTask({ commit }, { filterBy = {} }) {
			try {
				const tasks = await taskService.query(filterBy)
				commit({ type: 'setTasks', tasks })
			} catch (err) {
				console.log(err)
			}
		},
		async removeTask({ commit }, { taskId }) {
			try {
				await taskService.remove(taskId)
				commit({ type: 'removeTask', taskId })
			} catch (err) {
				console.log(err)
			}
		},
		async saveTask({ commit }, { task }) {
			try {
				let taskId = task._id

				const savedTask = await taskService.save(task)
				commit({
					type: taskId ? 'updateTask' : 'addTask',
					task: savedTask,
				})
			} catch (err) {
				console.log(err)
			}
		},
	},
}
