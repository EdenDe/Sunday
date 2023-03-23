import gBoard from '../../data/board.json' assert { type: 'json' }

export const storageService = {
	query,
	save,
	remove,
	getById,
}

function query(critiria) {
	return Promise.resolve(gBoard)
}

function save(board) {
	if (board._id) {
		const idx = gBoard.findIndex(
			currBoard => currBoard._id === board._id
		)
		if (idx === -1) return Promise.reject('No such gBoard')

		gBoard[idx] = board
	} else {
		board._id = _makeId()
		board.createdAt = Date.now()

		gBoard.push(board)
	}

	return _savegBoardsToFile().then(() => board)
}

function getById(gBoardId) {
	const gBoard = gBoard.find(gBoard => gBoard._id === gBoardId)
	return Promise.resolve(gBoard)
}

function remove(gBoardId) {
	const idx = gBoard.findIndex(gBoard => gBoard._id === gBoardId)
	if (idx === -1) return Promise.reject('No such gBoard')

	gBoard.splice(idx, 1)
	return _savegBoardsToFile()
}

function _makeId(length = 5) {
	let txt = ''
	let possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (let i = 0; i < length; i++) {
		txt += possible.charAt(
			Math.floor(Math.random() * possible.length)
		)
	}
	return txt
}

function _savegBoardsToFile() {
	debugger
	return new Promise((resolve, reject) => {
		var a = document.createElement('a')
		var file = new Blob([gBoard], { type: 'application/json' })
		a.href = URL.createObjectURL(file)
		a.download = 'board.json'
		a.click()
		resolve()
	})
}
