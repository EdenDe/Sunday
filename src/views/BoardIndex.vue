<template>
  <section class="board-index main-layout">
    <AppSideNav />
    <WorkspaceSideNav @add-board="addBoard" @change-board="changeBoard" />
    <RouterView />
  </section>
</template>

<script>
import AppSideNav from "@/components/AppSidenav.vue";
import WorkspaceSideNav from "@/components/WorkspaceSidenav.vue";

export default {
  components: {
    AppSideNav,
    WorkspaceSideNav,
  },
  methods: {
    addBoard() {
      const newBoard = this.$store.getters.emptyBoard;
      this.$store.dispatch({ type: "saveBoard", board: newBoard });
    },
    changeBoard(boardId) {
      console.log(boardId);
    },
  },
};
</script>
