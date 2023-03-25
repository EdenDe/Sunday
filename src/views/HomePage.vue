<template>
  <section class="home-page grid">
    <AppHeader :boardId="firstBoardId" />
    <div class="home-page-body grid">
      <h1 class="home-page-body-header">
        A platform build for a new way of working
      </h1>
      <h4 class="home-page-body-sub-header">
        What would you like to mange with sunday.com Work OS?
      </h4>
      <RouterLink
        :to="'/board/' + firstBoardId + '/main-table'"
        class="btn-get-started"
        >Get Started</RouterLink
      >

      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <img src="../assets/img/logo.png" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div
      v-for="(star, index) in 20"
      :key="star"
      class="star"
      :class="`star${index + 1}`"
    ></div>
  </section>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },

  computed: {
    firstBoardId() {
      const board = this.$store.getters.currBoard;
      if (board) return board._id;
      //changetothefirst
    },
  },
};
</script>
