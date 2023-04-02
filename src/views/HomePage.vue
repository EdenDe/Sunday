<template>
  <Loader v-if="isLoading" />
  <section class="home-page grid" v-else>
    <AppHeader :boardId="firstBoardId" />
    <div class="home-page-body grid">
      <div class="home-page-body-title grid">
        <h1 class="home-page-body-header">
          A platform built for a new way of working
        </h1>
        <h4 class="home-page-body-sub-header flex align-end justify-center">
          What would you like to manage with sunday.com Work OS?
          <div class="comet-line underline"></div>
        </h4>

        <RouterLink v-if="firstBoardId" :to="'/board/' + firstBoardId + '/main-table'" class="btn-get-started"
          @click.native="handleLinkClick">
          <span> Get Started </span>
        </RouterLink>

        <div class="under-btn" :style="{ marginTop: '8px', fontSize: '13px' }">
          No credit card needed &nbsp; ✦ &nbsp; Unlimited time on Free plan
        </div>
      </div>
      <div v-for="(star, index) in stars" :key="star" class="star" :class="`star${index + 1}`" :style="{
        animationDelay: `${star.delay}s`,
      }"></div>

      <div class="home-page-carousel">
        <div class="home-page-carousel-wrapper">
          <el-carousel :interval="40000" type="card" height="350px">
            <el-carousel-item
              v-for="item in ['http://res.cloudinary.com/decasx192/image/upload/v1680424852/dashboard2_zmqkse.jpg',
                'http://res.cloudinary.com/decasx192/image/upload/v1680424860/main-table2_axajnt.jpg', 'http://res.cloudinary.com/decasx192/image/upload/v1680424871/kanban2_j8rpfp.jpg']"
              :key="item">
              <img :src="item" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import Loader from '../components/Loader.vue'
import { utilService } from '../services/util.service.js'
export default {
  components: {
    AppHeader,
    Loader,
  },

  data() {
    return {
      stars: Array.from({ length: 15 }, () => ({
        delay: utilService.getRandomIntInclusive(1, 3),
      })),
      isLoading: false,
    }
  },
  methods: {
    handleLinkClick() {
      console.log('clicked on link in homepage')
      this.$store.commit({ type: 'setPageLoading', isLoading: true })
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
