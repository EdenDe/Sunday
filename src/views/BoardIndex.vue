<template>
  <AppSideNav />
  <WorkspaceSideNav />
  <RouterView />
</template>

<script>
import AppSideNav from '../components/AppSideNav.vue';
import WorkspaceSideNav from '../components/WorkspaceSideNav.vue';

export default {
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {

  },
  created() {

  },
  components: {
    AppSideNav,
    WorkspaceSideNav
  },
}
</script>

<style></style>