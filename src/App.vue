<template>
  <RouterView v-if="!pageLoading" />
  <Loader v-else />
</template>

<script>
import { RouterView } from 'vue-router'
import Loader from './components/Loader.vue'

export default {
  // watch: {
  //   pageLoading() {
  //     console.log('hi from watch')
  //   },
  // },
  mounted() {
    this.$store.dispatch({ type: 'loadBoards' })
    this.$store.dispatch({ type: 'loadUsers' })
  },
  computed: {
    pageLoading() {
      console.log('hi')
      console.log(this.$store.getters.getPageLoading)
      return this.$store.getters.getPageLoading
    },
  },
  components: {
    Loader,
  },
}
</script>
