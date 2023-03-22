import { boardService } from '../services/board.service.js'

export const boardStore = {
	state: {
		boards: [],
		currBoard: {},
	},
	mutations: {
		setBoards(state, { boards }) {
			state.boards = boards
		},
		setBoard(state, { board }) {
			state.currBoard = board
		},
		addBoard(state, { board }) {
			state.boards.push(board)
		},
		updateBoard(state, { board }) {
			const idx = state.boards.findIndex(t => t._id === board._id)
			state.boards.splice(idx, 1, board)
		},
		removeBoard(state, { boardId }) {
			state.boards = state.boards.filter(
				board => board._id !== boardId
			)
		},
	},
	getters: {
		boardsToDisplay({ boards }) {
			return boards
		},
		currBoard({ currBoard }) {
			return currBoard
		},
		groups({ currBoard }) {
			return currBoard.groups
		},
		cmpOrder({ currBoard }) {
			return currBoard.cmpOrder
		},
		statusLabels({ currBoard }) {
			return currBoard.statusLabels
		},
		priorityLabels({ currBoard }) {
			return currBoard.priorityLabels
		},
	},
	actions: {
		async loadBoards({ commit }, { filterBy = {} }) {
			try {
				const boards = await boardService.query(filterBy)
				commit({ type: 'setBoards', boards })
				commit({ type: 'setBoard', board: boards[0] })
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
		async updateCurrBoard(
			{ commit, state },
			{ groupId, taskId, prop, toUpdate }
		) {
			commit({ type: 'savePrevBoard' })

			var updatedBoard = boardService.updateBoard(
				state.currBoard,
				groupId,
				taskId,
				prop,
				toUpdate
			)
			// optimistic
			commit({ type: 'updateBoard', board: updatedBoard })
			try {
				updatedBoard = await boardService.save(state.currBoard)
			} catch (err) {
				commit({ type: 'undoBoard' })
				console.log('boardStore: Error in updateBoard', err)
				throw err
			}
		},
	},
}
