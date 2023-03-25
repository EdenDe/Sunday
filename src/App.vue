<template>
  <header></header>
  <RouterView />
</template>

<script>
import { RouterView } from "vue-router";

export default {
  created() {
    this.$store.dispatch({ type: "loadBoards" })
  },
}
</script>
