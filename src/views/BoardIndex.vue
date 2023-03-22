<template>
  <section class="board-index main-layout">
    <AppSideNav />
    <WorkspaceSideNav />
    <RouterView />
  </section>
</template>

<script>
import AppSideNav from "@/components/AppSidenav.vue";
import WorkspaceSideNav from "@/components/WorkspaceSidenav.vue";

export default {
  data() {
    return {};
  },
  methods: {},
  computed: {},
  created() {},
  components: {
    AppSideNav,
    WorkspaceSideNav,
  },
};
</script>

<style></style>
