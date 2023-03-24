<template>
  <div class="board-container board-layout">
    <BoardHeader />
    <section class="board-content">
      <RouterView />
    </section>
  </div>
</template>

<script>
import BoardHeader from "../components/BoardHeader.vue";
export default {
  components: {
    BoardHeader,
  },
  created() {
    this.$router.push({
      name: "table",
      params: { boardId: "my-board-id", page: 1 },
    });
  },
};
</script>
