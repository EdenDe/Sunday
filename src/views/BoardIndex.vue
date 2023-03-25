<template>
  <section class="board-index main-layout">
    <AppSideNav />
    <WorkspaceSideNav @addBoard="addBoard" @setBoard="loadBoard" />
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
export default {
  watch: {
    '$route.params.boardId': {
      handler() {
        this.loadBoard(this.$route.params.boardId)
      },
      immediate: true,
    },
  },
  components: {
    AppSideNav,
    WorkspaceSideNav,
    BoardHeader,
  },
  methods: {
    async addBoard() {
      const newBoard = boardService.getEmptyBoard()
      await this.$store.dispatch({
        type: 'saveBoard',
        board: newBoard,
      })
      this.updateParams()
    },

    async loadBoard(boardId) {
      await this.$store.dispatch({ type: 'loadBoard', boardId })
      this.updateParams()
    },

    updateParams() {
      const boardId = this.$store.getters.currBoardId
      this.$router.push({ params: { boardId: boardId } })
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
  },
}
</script>
