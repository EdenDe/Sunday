<template>
  <section class="person-list">
    <i v-icon="'plusRound'" class="plus-icon">+</i>
    <PersonAvatar v-for="(member, idx) in info" :key="idx" :member="member" />
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

  components: {
    PersonAvatar: Avatar,
  },
};
</script>

