<template>
  <Loader v-if="pageLoading" />
  <RouterView />
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
      return this.$store.getters.getPageLoading
    },
  },
  components: {
    Loader,
  },
}
</script>
