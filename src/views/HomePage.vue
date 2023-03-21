<template>
  <AppHeader />
  <RouterLink to="/boards">boards</RouterLink>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
export default {
  components: {
    AppHeader
  },
  computed: {
    boards() {
      return this.$store.getters.boardsToDisplay[0]
    }
  }
}
</script>
