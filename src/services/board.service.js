import { storageService } from './async-storage.service'
import gBoard from '../../data/board.json' assert { type: 'json' }

import { utilService } from './util.service.js'
import { userService } from './user.service'

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
}

window.boardService = boardService

async function query() {
	//localStorage.setItem(STORAGE_KEY, JSON.stringify(gBoard))
	return storageService.query(STORAGE_KEY)
}

function getById(boardId) {
	return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
	await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
	var savedBoard
	if (board._id) {
		savedBoard = await storageService.put(STORAGE_KEY, board)
	} else {
		savedBoard = await storageService.post(STORAGE_KEY, board)
	}
	return savedBoard
}

// function addActivity(prop, title, oldValue, newValue) {
// 	return {
// 		id: 'a' + utilService.makeId(10),
// 		createdAt: Date.now(),
// 		createdBy: userService.getLoggedInUser(),
// 		title,
// 		prop,
// 		oldValue,
// 		newValue,
// 	}
// }

function addActivity(prop, title, oldValue, newValue, color) {
	return {
		id: 'a' + utilService.makeId(10),
		createdAt: Date.now(),
		createdBy: userService.getLoggedInUser(),
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
	if (task[prop] !== toUpdate) {
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

function _updateGroup(board, groupId, prop, toUpdate) {
	let group = board.groups.find(group => groupId === group.id)
	if (prop !== 'tasks') {
		let activity = addActivity(
			prop,
			group.title,
			task[prop],
			toUpdate
		)
		board.activities.unshift(activity)
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
	// board = addActivity(currBoard._id, activity)
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
		_id: '',
		title: 'My board',
		isStarred: false,
		archivedAt: null,
		createdBy: {
			_id: 'u101',
			fullname: 'Lior Doron',
			imgUrl:
				'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png',
		},
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
		members: [
			{
				id: 'u101',
				fullname: 'Lior Doron',
				imgUrl:
					'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png',
			},
		],
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
						date: 1661113200000,
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
						date: 1661372400000,
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
						date: 1661631600000,
						status: '',
						timeline: [],
						txt: '',
						priority: '',
					},
				],
			},
		],
		activities: [],
	}
}
