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
	// getEmptyBoard,
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

function updateBoard(currBoard, groupId, taskId, prop, toUpdate) {
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

// function getEmptyBoard() {
// 	return {

// 	}
// }
