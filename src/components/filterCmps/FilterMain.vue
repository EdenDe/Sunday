<template>
  <section class="header flex align-end justify-between">
    <section class="header-txt flex">
      <p class="title">Quick filters</p>
      <p class="subtitle">Showing all {{ numberOfItems }} items</p>
    </section>
    <button class="save-btn" @click="$emit('setActiveFilter')">Save</button>
  </section>
  <section class="quick-filter">
    <p class="subheader">Recent filters</p>
    <section class="filters-lists-container flex justify-between">
      <ul>
        <p class="filter-title">
          Priority
          {{ filter.priority.length ? '/ ' + filter.priority.length : '' }}
        </p>
        <section class="filter-list">
          <li
            class="flex align-center justify-start"
            v-for="label in priorityLabels"
            :class="{ active: priorityFiltered(label.title) }"
            @click="
              $emit('setFilterBy', { by: 'priority', value: label.title })
            "
          >
            <div :style="{ backgroundColor: label.color }"></div>
            {{ label.title ? label.title : 'Blank' }}
          </li>
        </section>
      </ul>
      <ul>
        <p class="filter-title">
          Status {{ filter.status.length ? '/ ' + filter.status.length : '' }}
        </p>
        <section class="filter-list">
          <li
            class="flex align-center justify-start"
            v-for="label in statusLabels"
            :class="{ active: statusFiltered(label.title) }"
            @click="$emit('setFilterBy', { by: 'status', value: label.title })"
          >
            <div :style="{ backgroundColor: label.color }"></div>
            {{ label.title ? label.title : 'Blank' }}
          </li>
        </section>
      </ul>
      <ul>
        <p class="filter-title">
          Person {{ filter.person.length ? '/ ' + filter.person.length : '' }}
        </p>
        <section class="filter-list">
          <li
            class="flex align-center justify-start"
            v-for="member in membersLabels"
            :class="{ active: personFiltered(member._id) }"
            @click="$emit('setFilterBy', { by: 'person', value: member._id })"
          >
            <PersonAvatar :person="member" />
            {{ member.fullname }}
          </li>
        </section>
      </ul>
    </section>
  </section>
</template>

<script>
import Avatar from '../Avatar.vue'
export default {
  name: 'Main Filter',
  props: {
    filter: Object,
  },
  emits: ['setFilterBy', 'setActiveFilter'],
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
    personFiltered() {
      return (memberId) => {
        let list = this.filter.person
        return list.includes(memberId)
      }
    },
    statusFiltered() {
      return (status) => {
        let list = this.filter.status
        return list.includes(status)
      }
    },
    priorityFiltered() {
      return (priority) => {
        let list = this.filter.priority
        return list.includes(priority)
      }
    },
  },
  created() {},
  components: {
    PersonAvatar: Avatar,
  },
}
</script>

<style></style>
