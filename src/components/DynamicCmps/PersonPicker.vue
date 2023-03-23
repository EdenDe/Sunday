<template>
  <section class="person-list flex align-center justify-center">
    <i v-icon="'plusRound'" class="plus-icon" @click="isPersonPickerOpen = true">+</i>
    <PersonAvatar v-for="(person, idx) in info" :key="idx" :person="person" />
    <div v-if="isPersonPickerOpen" class="person-picker-container flex-col justify-between"
      v-clickOutside="onClosePicker">
      <div class="flex wrap person-picker">
        <article class="task-person flex align-center" v-for="(person, idx) in info" :key="idx">
          <PersonAvatar :person="person" />
          <span class="person-fullname">{{ person.fullname }}</span>
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
            <PersonAvatar :person="member" />
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
  name: "PersonPicker",
  emits: ['updateProp'],
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
      let AllMembers = this.$store.getters.currBoard.members
      return this.info.filter(member => !AllMembers.some(m => member.id === m.id))

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

