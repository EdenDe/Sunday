import { boardService } from '../services/board.service.js'

export const boardStore = {
	state: {
		boards: [],
	},
	mutations: {
		setBoards(state, { boards }) {
			state.boards = boards
		},
		addBoard(state, { board }) {
			state.boards.push(board)
		},
		updateBoard(state, { board }) {
			const idx = state.boards.findIndex(t => t._id === board._id)
			state.boards.splice(idx, 1, board)
		},
		removeBoard(state, { boardId }) {
			state.boards = state.boards.filter(board => board._id !== boardId)
		},
	},
	getters: {
		boardsToDisplay({ boards }) {
			return boards
		},
		groups({ boards }) {
			return boards.groups
		},
		cmpOrder({ boards }) {
			return boards.cmpOrder
		},
	},
	actions: {
		async loadBoard({ commit }, { filterBy = {} }) {
			try {
				const boards = await boardService.query(filterBy)
				commit({ type: 'setBoards', boards })
			} catch (err) {
				console.log(err)
			}
		},
		async removeBoard({ commit }, { boardId }) {
			try {
				await boardService.remove(boardId)
				commit({ type: 'removeBoard', boardId })
			} catch (err) {
				console.log(err)
			}
		},
		async saveBoard({ commit }, { board }) {
			try {
				let boardId = board._id

				const savedBoard = await boardService.save(board)
				commit({
					type: boardId ? 'updateBoard' : 'addBoard',
					board: savedBoard,
				})
			} catch (err) {
				console.log(err)
			}
		},
	},
}
