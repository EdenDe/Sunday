<template>
  <section class="login-signup grid">
    <AppHeader></AppHeader>
    <div class="singup-form-container grid">
      <h2>Log in to your account</h2>
      <p>Enter your work email address</p>
      <form @submit.prevent="loginSignup" class="singup-form grid">
        <input
          type="text"
          placeholder="Full name"
          v-if="isSignup"
          v-model="fullname"
        />
        <input
          type="text"
          placeholder="User name"
          v-model="credentials.username"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="credentials.password"
        />
        <button>Next</button>
      </form>
      <small v-if="!isSignup">
        Don't have an account yet? <a href="#" @click="toggleSignup">Sign up</a>
      </small>
      <small v-if="isSignup">
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
      isSignup: false,
      credentials: {
        password: '',
        username: '',
      },
      fullname: '',
    }
  },
  methods: {
    async loginSignup() {
      try {
        if (this.isSignup) {
          this.credentials.fullname = this.fullname
          await this.$store.dispatch({
            type: 'signup',
            credentials: this.credentials,
          })
        }
        await this.$store.dispatch({
          type: 'login',
          credentials: this.credentials,
        })
        this.$router.push(`/board/${this.firstBoardId}/main-table`)
      } catch (err) {
        console.log(err)
      }
    },
    toggleSignup() {
      this.isSignup = !this.isSignup
    },
  },
  computed: {
    firstBoardId() {
      const boards = this.$store.getters.boardsToDisplay
      if (boards.length) return boards[0]._id
    },
  },
  components: { AppHeader },
}
</script>
