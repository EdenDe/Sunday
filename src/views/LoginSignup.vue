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
          v-if="isSingup"
          v-model="fullname"
        />
        <input type="text" placeholder="User name" v-model="username" />
        <input type="password" placeholder="Password" v-model="password" />
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
      fullname: '',
      username: '',
      password: '',
    }
  },
  methods: {
    loginSignup() {
      let credentials = {
        username: this.username,
        password: this.password,
      }
      if (this.isSingup) {
        credentials.fullname = this.fullname
        this.onSignup(credentials)
      } else this.onLogin(credentials)
    },
    async onLogin(credentials) {
      try {
        await this.$store.dispatch({
          type: 'login',
          credentials,
        })
        // route.push('/board/' + firstBoardId + '/main-table'")
        // this.loggedinUser = this.$store.getters.loggedinUser
      } catch (err) {
        console.log("Cen't login...")
      }
    },
    async onSignup(credentials) {
      try {
        await this.$store.dispatch({
          type: 'signup',
          credentials,
        })
        // route.push('/board/' + firstBoardId + '/main-table'")
        // this.loggedinUser = this.$store.getters.loggedinUser
      } catch (err) {
        console.log("Cen't signup...")
      }
    },
    toggleSignup() {
      this.isSingup = !this.isSingup
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
