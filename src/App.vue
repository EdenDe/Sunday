<template>
  <header></header>
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router'

export default {
  mounted() {
    this.$store.dispatch({ type: 'loadBoards' })
  },
}
</script>
