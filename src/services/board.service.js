import { storageService } from './storage.service'

import { utilService } from './util.service.js'

const STORAGE_KEY = 'boardsDB'

export const boardService = {
	query,
	getById,
	save,
	remove,
	updateBoard,
	// getEmptyBoard,
}

window.boardService = boardService

async function query(filterBy) {
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

function updateBoard(board, groupId, taskId, prop, toUpdate) {
	if (taskId) {
		let group = board.find(group => groupId === group.id)
		let task = group.tasks.find(task => task.id === taskId)
		task[prop] = toUpdate
	} else if (groupId) {
		let group = board.find(group => groupId === group.id)
		group[prop] = toUpdate
	} else {
		board[prop] = toUpdate
	}

	return board
}

// function updateBoard(board, groupId, taskId, prop, toUpdate) {
// 	if (!taskId && !groupId) {
// 		board[prop] = toUpdate
// 		return board
// 	}
// 	let group = board.find(group => groupId === group.id)
// 	if (!taskId) {
// 		group[prop] = toUpdate
// 		return board
// 	}
// 	let task = group.tasks.find(task => task.id === taskId)
// 	task[prop] = toUpdate
// 	return board
// }

// function getEmptyBoard() {
// 	return {

// 	}
// }
