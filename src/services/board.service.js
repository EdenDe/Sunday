import { storageService } from './async-storage.service'
import gBoard from '../../data/board.json' assert { type: 'json' }

import { utilService } from './util.service.js'

const STORAGE_KEY = 'boardsDB'

export const boardService = {
	query,
	getById,
	save,
	remove,
	updateBoard,
	getEmptyBoard,
}

window.boardService = boardService

async function query() {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(gBoard))
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

function updateBoard(currBoard, groupId, taskId, prop, toUpdate) {
	//q- לעשות שנביא בורד ספציפי לפי איידי?
	const board = JSON.parse(JSON.stringify(currBoard))
	if (taskId) {
		let group = board.groups.find(group => groupId === group.id)
		let task = group.tasks.find(task => task.id === taskId)
		task[prop] = toUpdate
	} else if (groupId) {
		let group = board.groups.find(group => groupId === group.id)
		group[prop] = toUpdate
	} else {
		board[prop] = toUpdate
	}

	return board
}

function getEmptyBoard() {
	return {
		_id: utilService.makeId(),
		title: 'my first board',
		isStarred: false,
		archivedAt: null,
		createdBy: {
			_id: 'u101',
			fullname: 'Abi Abambi',
			imgUrl: 'http://some-img',
		},
		cmpOrder: [
			'checkbox',
			'taskTitle',
			'status',
			'priority',
			'person',
			'date',
			'timeline',
			'file',
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
				_id: 'u101',
				fullname: 'Tal Tarablus',
				imgUrl: 'https://www.google.com',
			},
		],
		groups: [
			{
				id: 'g12',
				title: 'my first group',
				color: '#e2445c',
				tasks: [
					{
						id: 't101',
						checkbox: 'null',
						taskTitle: 'learn CSS',
						person: [
							{ name: 'tal', color: 'red' },
							{ name: 'bal', color: 'black' },
							{ name: 'shal', color: 'green' },
						],
						date: 1661113200000,
						status: 'Working on it',
						priority: 'High',
					},
					{
						id: 't102',
						checkbox: 'null',
						taskTitle: 'learn vue',
						person: [
							{ name: 'tal', color: 'red' },
							{ name: 'bal', color: 'black' },
							{ name: 'shal', color: 'green' },
						],
						date: 1661372400000,
						status: 'Stuck',
						priority: '',
					},
					{
						id: 't103',
						checkbox: 'null',
						taskTitle: 'learn js',
						person: [
							{ name: 'tal', color: 'red' },
							{ name: 'bal', color: 'black' },
							{ name: 'shal', color: 'green' },
						],
						date: 1661631600000,
						status: 'Done',
						priority: 'High',
					},
				],
			},
		],
		activities: [],
	}
}
