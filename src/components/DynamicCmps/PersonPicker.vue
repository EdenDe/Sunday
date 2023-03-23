<template>
  <section class="person-list flex align-center justify-center">
    <i v-icon="'plusRound'" class="plus-icon" @click="isPersonPickerOpen = true">+</i>
    <PersonAvatar v-for="(member, idx) in info" :key="idx" :member="member" />
    <div v-if="isPersonPickerOpen" class="person-picker-container flex-col justify-between"
      v-clickOutside="onClosePicker">
      <div class="flex wrap person-picker">
        <article class="task-member flex align-center" v-for="(member, idx) in info" :key="idx">
          <PersonAvatar :member="member" />
          <span class="person-fullname">{{ member.fullname }}</span>
          <button class="delete-person" @click="onDelete">X</button>
        </article>
      </div>
      <div class="search-container">
        <input placeholder="Search names" />
        <span v-icon="'magnifyingGlass'"></span>
      </div>
      <div class="suggested-members">
        <h3>Suggested people</h3>
        <ul class="clean-list">
          <li v-for="member in members" class="flex align-center member-picker-suggestions">
            <PersonAvatar :member="member" />
            <span class="person-fullname">{{ member.fullname }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Avatar from '../Avatar.vue'

export default {
  name: "Person",
  emits: ["update"],
  props: {
    info: Array,
  },
  data() {
    return {
      isPersonPickerOpen: false
    }
  },
  computed: {
    members() {
      let board = this.$store.getters.currBoard
      return board.members
    }
  },
  methods: {
    onClosePicker() {
      this.isPersonPickerOpen = false
    }
  },
  components: {
    PersonAvatar: Avatar,
  },
};
</script>

