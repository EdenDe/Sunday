<template>
  <section class="app-sidenav flex align-center">
    <div class="monday-icon-wrapper flex align-center">
      <RouterLink to="/">
        <div class="monday-icon nav-item">
          <img
            class="flex center"
            src="https://cdn.monday.com/images/logos/monday_logo_icon.png"
            width="40"
            height="40"
            alt=""
          />
        </div>
      </RouterLink>
    </div>

    <div class="navigation-style-divider"></div>

    <section class="top-navigation-items-area flex-col align-center">
      <div class="icon-wrapper flex align-center justify-center">
        <i class="svg nav-item" v-icon="'workManagement'"></i>
      </div>
      <div class="icon-wrapper">
        <i class="svg nav-item" v-icon="'bell'"></i>
      </div>
      <div class="icon-wrapper">
        <i class="svg nav-item" v-icon="'archive'"></i>
      </div>
      <div class="icon-wrapper">
        <i class="svg nav-item" v-icon="'checklist'"></i>
      </div>
      <div class="icon-wrapper">
        <i class="svg nav-item" v-icon="'star'"></i>
      </div>
    </section>

    <section class="bottom-navigation-items-area align center">
      <div class="icon-wrapper">
        <i class="svg nav-item" v-icon="'puzzle'"></i>
      </div>
      <div class="icon-wrapper">
        <i class="svg nav-item" v-icon="'addPerson'"></i>
      </div>
      <div class="icon-wrapper">
        <i class="svg nav-item" v-icon="'search'"></i>
      </div>
      <div class="icon-wrapper">
        <i class="svg nav-item" v-icon="'question'"></i>
      </div>
    </section>

    <section
      class="footer-navigation-items-area flex-col align-center justify-center"
    >
      <div class="navigation-style-divider"></div>
      <div class="icon-wrapper flex justify-center align-center">
        <i class="flex align-center justify-center" v-icon="'dots'"></i>
      </div>
      <div class="avatar-wrapper flex align-center justify-center">
        <img
          src="https://files.monday.com/euc1/photos/40992736/thumb/40992736-user_photo_2023_03_17_07_35_49.png?1679038549"
          class="avatar-preview"
          title="Lior Doron"
        />
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "AppSidenav",
  data() {
    return {};
  },
  methods: {},
  computed: {},
  created() {},
  components: {},
};
</script>

<style></style>
