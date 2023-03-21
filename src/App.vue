<template>
  <header></header>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import AppSidenav from "./components/AppSidenav.vue";

export default {
  created() {
    this.$store.dispatch({ type: "loadBoards" });
  },
  components: { AppSidenav },
};
</script>
