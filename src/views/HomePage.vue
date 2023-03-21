<template>
  <AppHeader :boardId="firstBoardId" />
  <!-- <RouterLink :to="'/board/' + firstBoardId">boards</RouterLink> -->
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
export default {
  components: {
    AppHeader,
  },
  computed: {
    firstBoardId() {
      const board = this.$store.getters.currBoard
      if (board) return board._id
    },
  },
}
</script>
