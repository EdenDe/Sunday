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
  created() {
    this.loadBoard(this.$route.params.boardId)
  },
  watch: {
    currBoardId: {
      handler() {
        this.$router.push({ params: { boardId: this.currBoardId } })
      }
    },
  },
  computed: {
    currBoardId() {
      return this.$store.getters.currBoard._id
    }
  },
  methods: {
    addBoard() {
      const newBoard = boardService.getEmptyBoard()
      this.$store.dispatch({
        type: 'saveBoard',
        board: newBoard,
      })
    },
    loadBoard(boardId) {
      this.$store.dispatch({ type: 'loadBoard', boardId })
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
  components: {
    AppSideNav,
    WorkspaceSideNav,
    BoardHeader,
  },
}
</script>
