import { storageService } from './storage.service'

import { utilService } from './util.service.js'

const STORAGE_KEY = 'boardsDB'

export const boardService = {
	query,
	getById,
	save,
	remove,
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

// function getEmptyBoard() {
// 	return {

// 	}
// }
