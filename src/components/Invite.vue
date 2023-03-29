<template>
  <div class="invite-modal">
    <button class="btn-close" @click="onBack">
      <CloseIcon class="close-icon icon" />
    </button>
    <h1>Board Members</h1>
    <div class="search-user-wrapper">
      <input class="input-seach-user" placeholder="Enter name or email" v-model="search" />
      <ul class="option-list">
        <h5>People</h5>
        <li v-for="user in users" class="flex member" @mousedown="addToBoard(user)">
          <Avatar :person="user" />
          <span class="member-fullname">{{ user.fullname }}</span>
        </li>
      </ul>
    </div>
    <ul class="member-list">
      <li v-for="member in members" class="flex member" :ref="member._id">
        <Avatar :person="member" />
        <span class="member-fullname">{{ member.fullname }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import CloseIcon from '../assets/icons/CloseBig.svg'
import Avatar from '../components/Avatar.vue'

export default {
  name: 'Invite',
  data() {
    return {
      search: ''
    }
  },
  methods: {
    onBack() {
      this.$emit('toggleInviteModal')
    },
    addToBoard(user) {
      if (this.$refs[user._id]) {
        for (let index = 1; index < 5; index++) {
          setTimeout(() => {
            this.$refs[user._id].at(0).classList.toggle('focus')
          }, 400 * index)
        }
      } else {
        const members = JSON.parse(JSON.stringify(this.members))
        members.push(user)
        this.$emit('updateBoard', 'members', members)
      }

    }
  },
  computed: {
    members() {
      return this.$store.getters.currBoard.members
    },
    users() {
      const regex = new RegExp('^' + this.search, 'i')
      const users = this.$store.getters.users;
      return users.filter(user => regex.test(user.fullname))
    }
  },
  created() {

  },
  components: {
    CloseIcon,
    Avatar
  },
}
</script>

<style></style>