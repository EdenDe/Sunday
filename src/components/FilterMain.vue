<template>
  <section class="header flex align-end justify-start">
    <p class="title">Quick filters</p>
    <p class="subtitle">Showing all {{ numberOfItems }} items</p>
  </section>
  <section class="quick-filter">
    <p class="subheader">Recent filters</p>
    <section class="filters-lists-container flex justify-between">
      <ul>
        <p class="filter-title">Priority</p>
        <li
          class="flex align-center justify-start"
          v-for="label in priorityLabels"
          @click="$emit('setFilterBy', { by: 'priority', value: label.title })"
        >
          <div :style="{ backgroundColor: label.color }"></div>
          {{ label.title ? label.title : 'Blank' }}
        </li>
      </ul>
      <ul>
        <p class="filter-title">Status</p>
        <li
          class="flex align-center justify-start"
          v-for="label in statusLabels"
          @click="$emit('setFilterBy', { by: 'status', value: label.title })"
        >
          <div :style="{ backgroundColor: label.color }"></div>
          {{ label.title ? label.title : 'Blank' }}
        </li>
      </ul>
      <ul>
        <p class="filter-title">Members</p>
        <li
          class="flex align-center justify-start"
          v-for="member in membersLabels"
          @click="$emit('setFilterBy', { by: 'member', value: member._id })"
        >
          <PersonAvatar :person="member" />
          {{ member.fullname }}
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import Avatar from './Avatar.vue'
export default {
  name: 'Main Filter',
  data() {
    return {}
  },
  methods: {},
  computed: {
    numberOfItems() {
      return this.$store.getters.sumOfTasks
    },
    statusLabels() {
      return this.$store.getters.statusLabels
    },
    priorityLabels() {
      return this.$store.getters.priorityLabels
    },
    membersLabels() {
      return this.$store.getters.currBoard.members
    },
  },
  created() {},
  components: {
    PersonAvatar: Avatar,
  },
}
</script>

<style></style>
