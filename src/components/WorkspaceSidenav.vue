<template>
  <section class="workspace-sidenav">
    <!-- TODO: go to board ! -->
    <!-- <RouterLink to=""/> -->
    <!-- <RouterLink to=""/> -->
    <!-- <RouterLink to=""/> -->
  </section>
</template>

<script>
import { svgService } from "../services/svg.service";

export default {
  name: "WorkspaceSidenav",
  data() {
    return {};
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
  },
  computed: {},
  created() {},
  components: {},
};
</script>

<style></style>
