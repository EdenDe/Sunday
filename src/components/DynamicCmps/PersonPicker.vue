<template>
  <!-- <div :style="{ inset: 0, position: 'absolute', zIndex: 10000 }" @click="() => isPersonPickerOpen = true"></div> -->
  <section class="person-picker">
    <VDropdown :distance="6">
      <div class="add-icon-wrapper" @click="() => isPersonPickerOpen = true">
        <AddIcon class="add-icon icon" />
      </div>
      <template #popper>
        <div v-if="isPersonPickerOpen" class="person-picker-container flex-col justify-between"
          v-clickOutside="onClosePicker">
          <div class="flex wrap person-picker-avatar">
            <article class="task-person flex align-center" v-for="(person, idx) in info" :key="idx">
              <PersonAvatar :person="person" />
              <span class="person-fullname">{{ person.fullname }}</span>
              <button class="delete-person" @click="() => onDelete(person._id)">
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
              <li v-for="member in members" @click="() => addPersonToTask(member)"
                class="flex align-center member-picker-suggestions">
                <PersonAvatar :person="member" />
                <span class="person-fullname">{{ member.fullname }}</span>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </VDropdown>
    <section class="person-list flex align-center justify-center" @click="() => isPersonPickerOpen = true">
      <PersonAvatar v-for="(person, idx) in personToDisplay" :key="idx" :person="person" />
      <div class="merge-person avatar flex align-center" v-if="info?.length > personToDisplay?.length">
        <span class="flex align-center">+{{ info.length - 1 }}</span>
      </div>
      <img v-if="!personToDisplay?.length" src="https://cdn.monday.com/icons/dapulse-person-column.svg"
        class="person-default-icon" title="" alt="" aria-hidden="true">
    </section>
  </section>
</template>

<script>
import Avatar from '../Avatar.vue'
import SearchIcon from '../../assets/icons/Search.svg'
import CloseIcon from '../../assets/icons/Close.svg'
import AddIcon from '../../assets/icons/Add.svg'
import PersonIcon from '../../assets/icons/PersonRound.svg'
export default {
  name: 'PersonPicker',
  emits: ['updateProp'],
  props: {
    info: Array,
    maxDisplay: {
      type: Number,
      default: 2,
    },
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
    personToDisplay() {
      if (this.info?.length <= this.maxDisplay) {
        return this.info
      }
      return this.info?.slice(0, this.maxDisplay - 1)
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
      this.onClosePicker()
      this.updatePersonList(personList)
    },
  },
  components: {
    PersonAvatar: Avatar,
    SearchIcon,
    CloseIcon,
    AddIcon,
    PersonIcon
  },
}
</script>
