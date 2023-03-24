<template>
  <section class="app-header home-page-layout">
    <div>
      <div class="logo">
        <RouterLink to="/" class="logo-link">
          <img class="logo-img" src="../assets/img/logo.png" alt="logo" />
          <div>Sunday <span>.com</span></div>
        </RouterLink>
      </div>
      <RouterLink to="/login-signup" class="btn-get-started">
        login
      </RouterLink>
    </div>
  </section>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'AppHeader',
  props: { boardId: String },
  components: { RouterLink },
}
</script>
