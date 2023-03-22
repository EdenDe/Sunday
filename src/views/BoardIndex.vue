<template>
  <section class="board-index main-layout">
    <AppSideNav />
    <WorkspaceSideNav />
    <RouterView />
  </section>
</template>

<script>
import AppSideNav from "../components/AppSideNav.vue";
import WorkspaceSideNav from "../components/WorkspaceSideNav.vue";

export default {
  data() {
    return {};
  },
  methods: {},
  computed: {},
  created() {
    console.log("here?");
  },
  components: {
    AppSideNav,
    WorkspaceSideNav,
  },
};
</script>

<style></style>
