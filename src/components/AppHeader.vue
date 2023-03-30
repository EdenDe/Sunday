<template>
  <section class="app-header home-page-layout">
    <div>
      <div class="logo">
        <RouterLink to="/" class="logo-link">
          <img class="logo-img" src="../assets/img/logo.png" alt="logo" />
          <div>Sunday <span>.com</span></div>
        </RouterLink>
      </div>
      <div class="btn-wrapper">
        <div class="login">
          <RouterLink
            to="/login-signup"
            class="login-btn flex align-center justify-center"
          >
            <span class="login-btn-txt">Log In</span>
          </RouterLink>
        </div>
        <div class="btn flex">
          <RouterLink
            :to="'/board/' + boardId + '/main-table'"
            class="btn-get-started flex justify-between"
          >
            Get Started
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'AppHeader',
  props: { boardId: String },
}
</script>
