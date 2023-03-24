<template>
  <section class="login-signup grid">
    <AppHeader></AppHeader>
    <div class="singup-form-container grid">
      <h2>Log in to your account</h2>
      <p>Enter your work email address</p>
      <form @submit="login" class="singup-form grid">
        <input type="text" placeholder="Full name" v-if="isSingup" />
        <input type="text" placeholder="User name" />
        <input type="password" placeholder="Password" />
        <button>Next</button>
      </form>
      <small v-if="!isSingup">
        Don't have an account yet? <a href="#" @click="toggleSignup">Sign up</a>
      </small>
      <small v-if="isSingup">
        Have an account? <a href="#" @click="toggleSignup">Login</a>
      </small>
    </div>
  </section>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
export default {
  name: 'LoginSignup',
  data() {
    return {
      isSingup: false,
    }
  },
  methods: {
    login() {
      if (this.isSingup) {
      } else {
      }
    },
    toggleSignup() {
      this.isSingup = !this.isSingup
    },
  },
  computed() {},
  components: { AppHeader },
}
</script>
