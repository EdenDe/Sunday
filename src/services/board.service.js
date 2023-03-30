import { storageService } from './async-storage.service'
import gBoard from '../../data/board.json' assert { type: 'json' }

import { utilService } from './util.service.js'
import { userService } from './user.service'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'boardsDB'
export const boardService = {
	query,
	getById,
	save,
	remove,
	updateBoard,
	getEmptyBoard,
	getEmptyGroup,
	getEmptyTask,
	addActivity,
	setFilter,
}

window.boardService = boardService

async function query() {
	return httpService.get('board')
}

async function getById(boardId) {
	return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
	return httpService.delete(`board/${boardId}`)
}

async function save(board) {
	if (board._id) {
		return await httpService.put(`board/${board._id}`, board)
	} else {
		return await httpService.post(`board`, board)
	}
}

//const currBoard = await getById('6422de01e6f5b31b74228324')
// setFilter(currBoard, {
// 	txt: '',
// 	status: [],
// 	person: [],
// 	priority: [],
// })

function setFilter(currBoard, filterBy) {
	console.log(filterBy)
	let board = JSON.parse(JSON.stringify(currBoard))
	let groups = []
	board.groups.forEach(group => {
		let tasks = []
		group.tasks.forEach(task => {
			let regex = new RegExp(filterBy.txt, 'i')
			if (
				regex.test(task.taskTitle) &&
				(!filterBy.status.length ||
					filterBy.status.includes(task.status)) &&
				(!filterBy.priority.length ||
					filterBy.priority.includes(task.priority)) &&
				(!filterBy.person?.length ||
					task.person.some(person =>
						filterBy.person.includes(person._id)
					))
			) {
				tasks.push(task)
			}
		})

		if (tasks.length) {
			group.tasks = tasks
			groups.push(group)
		}
	})
	board.groups = groups
	return board
}

function addActivity(prop, title, oldValue, newValue, color) {
	return {
		id: 'a' + utilService.makeId(10),
		createdAt: Date.now(),
		createdBy: userService.getLoggedinUser(),
		title,
		prop,
		oldValue,
		newValue,
		color,
	}
}

// async function addActivity(boardId, props) {
// 	const act = _updateAcivitiy({ ...props })
// 	const board = await getById(boardId)
// 	board.activities.push(act)
// 	return board.activities
// }

function _updateTask(board, groupId, taskId, prop, toUpdate) {
	let group = board.groups.find(group => groupId === group.id)
	let task = group.tasks.find(task => task.id === taskId)
	if (
		task[prop] !== toUpdate &&
		prop !== 'checkbox' &&
		prop !== 'updates'
	) {
		let activity = addActivity(
			prop,
			task.taskTitle,
			task[prop],
			toUpdate
		)
		activity.taskId = taskId
		board.activities.unshift(activity)
	}
	task[prop] = toUpdate
	return board
}

function _activityRemoveOrAddTask(groupTitle, taskList, command) {
	let activities = taskList.map(task => {
		const activity = addActivity(
			command,
			task.taskTitle,
			command === 'Created' ? 'Group: ' + groupTitle : null
		)
		activity.taskId = task.id
		return activity
	})
	return activities
}

function _updateGroup(board, groupId, prop, toUpdate) {
	let group = board.groups.find(group => groupId === group.id)
	if (prop !== 'tasks') {
		let activity = addActivity(
			prop,
			group.title,
			group[prop],
			toUpdate
		)
		board.activities.unshift(activity)
	} else if (group.tasks.length !== toUpdate.length) {
		const activities = []
		const removedTasks = group.tasks.filter(
			task => !toUpdate.some(t => t.id === task.id)
		)

		if (removedTasks) {
			activities.push(
				..._activityRemoveOrAddTask(
					group.title,
					removedTasks,
					'Deleted'
				)
			)
		}

		const newTasks = toUpdate.filter(
			task => !group.tasks.some(t => t.id === task.id)
		)

		if (newTasks) {
			activities.push(
				..._activityRemoveOrAddTask(group.title, newTasks, 'Created')
			)
		}

		board.activities.unshift(...activities)
	}

	group[prop] = toUpdate
	return board
}

function _updateBoard(board, prop, toUpdate) {
	if (prop !== 'activities') {
		board[prop] = toUpdate
	} else {
		board.activities.unshift(toUpdate)
	}
	return board
}

function updateBoard(currBoard, groupId, taskId, prop, toUpdate) {
	const board = JSON.parse(JSON.stringify(currBoard))
	if (taskId)
		return _updateTask(board, groupId, taskId, prop, toUpdate)
	else if (groupId)
		return _updateGroup(board, groupId, prop, toUpdate)

	return _updateBoard(board, prop, toUpdate)
}

function getEmptyGroup() {
	return {
		id: 'g' + utilService.makeId(),
		title: 'New Group',
		color: utilService.getRandomColor(),
		tasks: [],
	}
}

function getEmptyTask() {
	return {
		id: 't' + utilService.makeId(),
		checkbox: false,
		person: [],
		taskTitle: '',
		date: null,
		status: '',
		timeline: [],
		txt: '',
		priority: '',
	}
}

function getEmptyBoard() {
	return {
		title: 'My board',
		isStarred: false,
		archivedAt: null,
		createdBy: userService.getLoggedinUser(),
		cmpOrder: [
			{ name: 'checkbox', width: '30px' },
			{ name: 'taskTitle', width: '1fr' },
			{ name: 'person', width: '80px' },
			{ name: 'status', width: '80px' },
			{ name: 'priority', width: '80px' },
			{ name: 'date', width: '120px' },
			{ name: 'timeline', width: '1fr' },
			{ name: 'txt', width: '1fr' },
			{ name: 'file', width: '80px' },
		],
		priorityLabels: [
			{
				id: 'pl101',
				title: 'Critical',
				color: '#333333',
			},
			{
				id: 'pl102',
				title: 'High',
				color: '#401694',
			},
			{
				id: 'pl103',
				title: 'Medium',
				color: '#5559df',
			},
			{
				id: 'pl104',
				title: 'Low',
				color: '#579bfc',
			},
			{
				id: 'pl105',
				title: '',
				color: '#c4c4c4',
			},
		],
		statusLabels: [
			{
				id: 'l101',
				title: 'Done',
				color: '#00c875',
			},
			{
				id: 'l102',
				title: 'Working on it',
				color: '#fdab3d',
			},
			{
				id: 'l103',
				title: 'Stuck',
				color: '#e2445c',
			},
			{
				id: 'l104',
				title: 'Need help',
				color: '#a25ddc',
			},
			{
				id: 'l105',
				title: 'Finishing soon',
				color: '#2b76e5',
			},
			{
				id: 'l106',
				title: '',
				color: '#c4c4c4',
			},
		],
		members: [userService.getLoggedinUser()],
		groups: [
			{
				id: 'g' + utilService.makeId(),
				title: 'My first group',
				color: '#e2445c',
				tasks: [
					{
						id: 't' + utilService.makeId(),
						checkbox: false,
						taskTitle: 'Task 1',
						person: [],
						date: null,
						status: '',
						timeline: [],
						txt: '',
						priority: '',
					},
					{
						id: 't' + utilService.makeId(),
						checkbox: false,
						taskTitle: 'Task 2',
						person: [],
						date: null,
						status: '',
						timeline: [],
						txt: '',
						priority: '',
					},
					{
						id: 't' + utilService.makeId(),
						checkbox: false,
						taskTitle: 'Task 3',
						person: [],
						date: null,
						status: '',
						timeline: [],
						txt: '',
						priority: '',
					},
				],
			},
		],
		activities: [],
		updates: [],
	}
}
