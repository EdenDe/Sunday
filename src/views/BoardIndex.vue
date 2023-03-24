<template>
  <section class="board-index main-layout">
    <AppSideNav />
    <WorkspaceSideNav />
    <RouterView />
  </section>
</template>

<script>
import AppSideNav from '@/components/AppSidenav.vue'
import WorkspaceSideNav from '@/components/WorkspaceSidenav.vue'

export default {
  components: {
    AppSideNav,
    WorkspaceSideNav,
  },
}
</script>
