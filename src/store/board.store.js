import { boardService } from '../services/board.service.js'
import { utilService } from '../services/util.service.js'

export const boardStore = {
  state: {
    boards: [],
    currBoard: {},
    savePrevBoard: {},
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
      state.currBoard = board
    },
    updateBoard(state, { board }) {
      const idx = state.boards.findIndex((t) => t._id === board._id)
      state.boards.splice(idx, 1, board)
      state.currBoard = state.boards[idx]
    },
    remove(state, { boardId }) {
      state.boards = state.boards.filter((board) => board._id !== boardId)
    },
    savePrevBoard(state) {
      state.savePrevBoard = state.currBoard
    },
    undoBoard(state) {
      state.currBoard = state.savePrevBoard
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
      console.log(currBoard.statusLabels)
      return currBoard.statusLabels
    },
    priorityLabels({ currBoard }) {
      return currBoard.priorityLabels
    },
    emptyBoard() {
      return boardService.getEmptyBoard()
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
    async remove({ commit }, { boardId }) {
      try {
        await boardService.removeBoard(boardId)
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
    async updateActivity({ commit }, { groupId, taskId, prop, toUpdate }) {
      console.log({ groupId, taskId, prop, toUpdate })
      const activity = {
        id: utilService.makeId(),
        txt: prop,
        createdAt: Date.now(),
        byMember: userService.getLoggedinUser(),
        group: group, // optional
        task: task, // optional
      }
    },
    async updateCurrBoard(
      { dispatch, commit, state },
      { groupId, taskId, prop, toUpdate }
    ) {
      commit({ type: 'savePrevBoard' })
      // dispatch({ type: 'updateActivity', groupId, taskId, prop, toUpdate })

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
        await boardService.save(state.currBoard)
      } catch (err) {
        commit({ type: 'undoBoard' })
        console.log('boardStore: Error in updateBoard', err)
        throw err
      }
    },
  },
}
