<template>
  <p class="title flex align-center">Quick person filter</p>
  <p class="subtitle">Filter items and subitems by person</p>
  <div class="person-list-item">
    <ul class="clean-list flex">
      <li class="flex align-center justify-center" v-for="member in members">
        <PersonAvatar
          :person="member"
          @click="$emit('setFilterBy', { by: 'member', value: member })"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from '../Avatar.vue'
export default {
  name: 'MemberFilter',
  data() {
    return {}
  },
  computed: {
    members() {
      return this.$store.getters.currBoard.members
    },
  },
  components: {
    PersonAvatar: Avatar,
  },
}
</script>
