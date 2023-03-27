<template>
  <section class="app-sidenav flex align-center flex-col justify-between">
    <div class="monday-icon-wrapper align-end flex justify-center">
      <RouterLink to="/">
        <div
          class="monday-icon nav-item flex align-end"
          v-tooltip="'Home Page'"
        >
          <img
            class="flex align-center justify-center"
            src="../assets/img/logo.png"
            width="40"
            height="40"
            alt=""
          />
        </div>
      </RouterLink>
    </div>
    <div class="navigation-style-divider"></div>

    <div class="workspace-arrow-left-div"></div>
    <section class="top-navigation-items-area flex-col align-center">
      <div
        class="icon-wrapper flex align-center justify-center"
        v-tooltip="'work management'"
      >
        <i class="svg nav-item" v-icon="'workManagement'"></i>
      </div>
      <div class="icon-wrapper" hidden>
        <i class="svg nav-item" v-icon="'bell'"></i>
      </div>
      <div class="icon-wrapper" hidden>
        <i class="svg nav-item" v-icon="'archive'"></i>
      </div>
      <div class="icon-wrapper" hidden>
        <i class="svg nav-item" v-icon="'checklist'"></i>
      </div>
      <div class="icon-wrapper" hidden>
        <i class="svg nav-item" v-icon="'star'"></i>
      </div>
    </section>

    <section class="bottom-navigation-items-area align center">
      <div class="icon-wrapper" hidden>
        <i class="svg nav-item" v-icon="'puzzle'"></i>
      </div>
      <div class="icon-wrapper" hidden>
        <i class="svg nav-item" v-icon="'addPerson'"></i>
      </div>
      <div class="icon-wrapper" hidden>
        <i class="svg nav-item" v-icon="'search'"></i>
      </div>
      <div class="icon-wrapper" hidden>
        <i class="svg nav-item" v-icon="'question'"></i>
      </div>
    </section>

    <section
      class="footer-navigation-items-area flex-col align-center justify-center"
    >
      <div class="navigation-style-divider"></div>
      <div class="icon-wrapper flex justify-center align-center" hidden></div>
      <div class="avatar-wrapper flex align-center justify-center">
        <img
          src="../assets/img/avatar-side-nav.png"
          class="avatar-preview"
          title="Lior Doron"
        />
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'AppSidenav',
}
</script>
