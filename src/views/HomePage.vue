<template>
  <section class="home-page grid">
    <AppHeader :boardId="firstBoardId" />
    <div class="home-page-body grid">
      <div class="home-page-body-title grid">
        <h1 class="home-page-body-header">
          A platform built for a new way of working
        </h1>
        <h4 class="home-page-body-sub-header flex align-end justify-center">
          What would you like to mange with sunday.com Work OS?
          <div class="comet-line underline"></div>
        </h4>
      </div>
      <RouterLink
        v-if="firstBoardId"
        :to="'/board/' + firstBoardId + '/main-table'"
        class="btn-get-started"
      >
        <span> Get Started </span>
      </RouterLink>
      <div :style="{ marginTop: '8px', fontSize: '13px' }">
        No credit card needed &nbsp; ✦ &nbsp; Unlimited time on Free plan
      </div>

      <div
        v-for="(star, index) in stars"
        :key="star"
        class="star"
        :class="`star${index + 1}`"
        :style="{
          animationDelay: `${star.delay}s`,
        }"
      ></div>
    </div>
    <div class="home-page-carousel">
      <div class="home-page-carousel-wrapper">
        <el-carousel :interval="4000" type="card" height="350px">
          <el-carousel-item v-for="item in 3" :key="item">
            <img src="../assets/img/homePageImg/0.png" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </section>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import { utilService } from '../services/util.service.js'
export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      stars: Array.from({ length: 15 }, () => ({
        delay: utilService.getRandomIntInclusive(1, 3),
      })),
    }
  },
  computed: {
    firstBoardId() {
      const boards = this.$store.getters.boardsToDisplay
      if (boards.length) return boards[0]._id
    },
  },
}
</script>
