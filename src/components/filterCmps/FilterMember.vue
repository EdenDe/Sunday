<template>
  <p class="title flex align-center">Quick person filter</p>
  <p class="subtitle">Filter items and subitems by person</p>
  <div class="person-list-item">
    <ul class="clean-list flex">
      <li class="flex align-center justify-center" v-for="member in members"
        :class="{ active: personFiltered(member._id) }">
        <PersonAvatar v-tooltip="member.fullname" :person="member"
          @click="() => $emit('setFilterBy', { by: 'person', value: member._id })" />
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from '../Avatar.vue'
export default {
  name: 'MemberFilter',
  props: {
    filterPerson: Array
  },
  emits: ['setFilterBy'],
  computed: {
    members() {
      return this.$store.getters.currBoard.members
    },
    personFiltered() {
      return (memberId) => {
        let yo = this.$store.getters.filterBy.person
        return yo.includes(memberId)
      }
    }
  },
  components: {
    PersonAvatar: Avatar,
  },
}
</script>
