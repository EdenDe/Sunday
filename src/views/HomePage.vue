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
      <div class="comet-line underline"></div>
      <RouterLink
        v-if="firstBoardId"
        :to="'/board/' + firstBoardId + '/main-table'"
        class="btn-get-started"
        >Get Started
      </RouterLink>

      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 3" :key="item">
          <img src="../assets/img/homePageImg/0.png" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div
      v-for="(star, index) in 15"
      :key="star"
      class="star"
      :class="`star${index + 1}`"
      :style="{
        animationDelay: starAnimationDelay(index),
      }"
    ></div>
  </section>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import { utilService } from '../services/util.service.js'
export default {
  components: {
    AppHeader,
  },
  methods: {
    starAnimationDelay(index) {
      return `${index / 5}s`
    },
  },
  computed: {
    firstBoardId() {
      const boards = this.$store.getters.boardsToDisplay
      if (boards.length) return boards[0]._id
    },
  },
}
</script>
