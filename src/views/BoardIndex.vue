<template>
  <section class="board-index main-layout">
    <AppSideNav />
    <WorkspaceSideNav @addBoard="addBoard" @changeBoard="changeBoard" />
    <div class="board-container board-layout">
      <BoardHeader />
      <RouterView />
    </div>
  </section>
</template>

<script>
import AppSideNav from '@/components/AppSidenav.vue'
import WorkspaceSideNav from '@/components/WorkspaceSidenav.vue'
import BoardHeader from '../components/BoardHeader.vue'
export default {
  components: {
    AppSideNav,
    WorkspaceSideNav,
    BoardHeader,
  },
  methods: {
    addBoard() {
      const newBoard = this.$store.getters.emptyBoard
      this.$store.dispatch({ type: 'saveBoard', board: newBoard })
    },
    changeBoard(boardId) {
      console.log(boardId)
    },
  },
}
</script>
