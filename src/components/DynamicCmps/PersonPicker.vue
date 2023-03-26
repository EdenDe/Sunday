<template>
  <section class="person-list flex align-center justify-center">
    <div class="plus-icon" @click="isPersonPickerOpen = true">
      <AddIcon class="add-icon icon" />
    </div>
    <PersonAvatar v-for="(person, idx) in info" :key="idx" :person="person" />
    <div
      v-if="isPersonPickerOpen"
      class="person-picker-container flex-col justify-between"
      v-clickOutside="onClosePicker"
    >
      <div class="flex wrap person-picker">
        <article
          class="task-person flex align-center"
          v-for="(person, idx) in info"
          :key="idx"
        >
          <PersonAvatar :person="person" />
          <span class="person-fullname">{{ person.fullname }}</span>
          <button class="delete-person" @click="onDelete(person._id)">
            <CloseIcon class="close-icon icon" />
          </button>
        </article>
      </div>
      <div class="search-container">
        <input placeholder="Search names" v-model="search" />
        <SearchIcon class="search-icon icon" />
      </div>
      <div class="suggested-members">
        <h3>Suggested people</h3>
        <ul class="clean-list">
          <li
            v-for="member in members"
            @click="addPersonToTask(member)"
            class="flex align-center member-picker-suggestions"
          >
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
import SearchIcon from '../../assets/icons/Search.svg'
import CloseIcon from '../../assets/icons/Close.svg'
import AddIcon from '../../assets/icons/Add.svg'
export default {
  name: 'PersonPicker',
  emits: ['updateProp'],
  props: {
    info: Array,
  },
  data() {
    return {
      isPersonPickerOpen: false,
      search: '',
    }
  },
  computed: {
    members() {
      let AllMembers = this.$store.getters.currBoard.members
      const regex = new RegExp('^' + this.search, 'i')

      return AllMembers.filter(
        (member) =>
          !this.info.some((m) => member._id === m._id) &&
          regex.test(member.fullname)
      )
    },
  },
  methods: {
    onClosePicker() {
      this.isPersonPickerOpen = false
    },
    onDelete(personId) {
      let person = this.info.filter((person) => person._id !== personId)
      this.updatePersonList(person)
    },
    updatePersonList(person) {
      this.$emit('updateProp', 'person', person)
    },
    addPersonToTask(member) {
      let personList = [...this.info]
      personList.push(member)
      this.updatePersonList(personList)
    },
  },
  components: {
    PersonAvatar: Avatar,
    SearchIcon,
    CloseIcon,
    AddIcon,
  },
}
</script>
