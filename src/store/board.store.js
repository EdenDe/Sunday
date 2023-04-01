import { boardService } from '../services/board.service.js'

export const boardStore = {
  state: {
    boards: [],
    currBoard: {},
    filterBy: {
      txt: '',
      status: [],
      person: [],
      priority: [],
    },
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
    removeBoard(state, { boardId }) {
      state.boards = state.boards.filter((board) => board._id !== boardId)
      state.currBoard = state.boards[0]
    },
    savePrevBoard(state) {
      state.savePrevBoard = state.currBoard
    },
    undoBoard(state) {
      state.currBoard = state.savePrevBoard
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy
    },
  },
  getters: {
    boardsToDisplay({ boards }) {
      return boards.map(({ _id, title }) => ({ _id, title }))
    },
    currBoard({ currBoard, filterBy }) {
      if (currBoard._id) {
        return boardService.setFilter(currBoard, filterBy)
      }
      return currBoard
    },
    groups({ currBoard }) {
      return currBoard.groups
    },
    sumOfTasks({ currBoard }) {
      return currBoard.groups?.reduce((acc, group) => {
        acc += group.tasks.length
        return acc
      }, 0)
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
    activities({ currBoard }) {
      return currBoard.activities
    },
    filterBy({ filterBy }) {
      return filterBy
    },
  },
  actions: {
    async loadBoards({ commit }, { filterBy = {} }) {
      try {
        const boards = await boardService.query(filterBy)
        if (!boards || !boards.length) return

        commit({ type: 'setBoards', boards })
        commit({ type: 'setBoard', board: boards[0] })
      } catch (err) {
        console.log(err)
      }
    },
    async loadBoard({ state, commit }, { boardId }) {
      //const board = await boardService.getById(boardId)
      const board = state.boards.find((board) => board._id === boardId)

      if (board) {
        commit({ type: 'setBoard', board })
      }
    },
    async remove({ commit }, { boardId }) {
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
    setFilter({ commit }, { filterBy }) {
      commit({ type: 'setFilter', filterBy })
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
        await boardService.save(updatedBoard)
      } catch (err) {
        commit({ type: 'undoBoard' })
        console.log('boardStore: Error in updateBoard', err)
        throw err
      }
    },
  },
}
