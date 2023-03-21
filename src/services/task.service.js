import { storageService } from './async-storage.service.js'

import { utilService } from './util.service.js'

const STORAGE_KEY = 'tasksDB'

export const taskService = {
	query,
	getById,
	save,
	remove,
	getEmptyTask,
}

async function query(filterBy) {
	return storageService.query(STORAGE_KEY)
}

function getById(taskId) {
	return storageService.get(STORAGE_KEY, taskId)
}

async function remove(taskId) {
	await storageService.remove(STORAGE_KEY, taskId)
}

async function save(task) {
	var savedTask
	if (task._id) {
		savedTask = await storageService.put(STORAGE_KEY, task)
	} else {
		savedTask = await storageService.post(STORAGE_KEY, task)
	}
	return savedTask
}

function getEmptyTask() {
	return {
		vendor: 'Susita-' + (Date.now() % 1000),
		price: utilService.getRandomIntInclusive(1000, 9000),
	}
}
