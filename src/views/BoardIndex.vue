<template>
  <section class="board-index main-layout">
    <AppSideNav />
    <WorkspaceSideNav
      @addBoard="addBoard"
      @setBoard="loadBoard"
      @copyBoard="copyBoard"
      @removeBoard="removeBoard"
    />
    <div class="board-container board-layout">
      <BoardHeader @updateBoard="updateBoard" />
      <RouterView />
    </div>
  </section>
</template>

<script>
import AppSideNav from '@/components/AppSidenav.vue'
import WorkspaceSideNav from '@/components/WorkspaceSidenav.vue'
import BoardHeader from '../components/BoardHeader.vue'
import { boardService } from '../services/board.service.js'
import {
  socketService,
  SOCKET_EVENT_UPDATE_BOARD,
  SOCKET_EMIT_UPDATE_BOARD,
  SOCKET_EMIT_SET_TOPIC,
} from '../services/socket.service.js'
export default {
  created() {
    this.loadBoard(this.$route.params.boardId)
    socketService.on(SOCKET_EVENT_UPDATE_BOARD, this.updateBoardFromSocket)
  },
  watch: {
    currBoardId: {
      handler() {
        console.log('currBoardId', this.currBoardId)
        this.$router.push({ params: { boardId: this.currBoardId } })
        socketService.emit(SOCKET_EMIT_SET_TOPIC, this.currBoardId)
      },
    },
  },
  computed: {
    currBoardId() {
      return this.$store.getters.currBoard._id
    },
  },
  methods: {
    addBoard() {
      const newBoard = boardService.getEmptyBoard()
      this.$store.dispatch({
        type: 'saveBoard',
        board: newBoard,
      })
    },
    async loadBoard(boardId) {
      await this.$store.dispatch({ type: 'loadBoard', boardId })
    },
    updateBoard(prop, toUpdate) {
      this.$store.dispatch({
        type: 'updateCurrBoard',
        groupId: null,
        taskId: null,
        prop: prop,
        toUpdate,
      })
    },
    updateBoardFromSocket(board) {
      console.log('hi')
      this.$store.commit({ type: 'updateBoard', board })
    },
    removeBoard(boardId) {
      this.$store.dispatch({ type: 'remove', boardId })
    },
    async copyBoard(boardId) {
      let newBoard = await boardService.getById(boardId)
      delete newBoard._id
      this.$store.dispatch({ type: 'saveBoard', board: newBoard })
    },
  },
  unmounted() {
    socketService.off(SOCKET_EVENT_UPDATE_BOARD, this.board)
  },
  components: {
    AppSideNav,
    WorkspaceSideNav,
    BoardHeader,
  },
}
</script>
