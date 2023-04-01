<template>
  <div class="mobile-view-select">
    <div class="filter-select-input" @click="toggleOptions">
      <div class="column-filter-title">
        <!-- <div class="icon-wrapper flex align-center">
          <StatusIcon class="icon-status icon" />
        </div> -->
        <span>{{ columnFilter === 'main-table' ? 'main table' : columnFilter }}</span>
      </div>
      <!-- <div class="icon icon-arrow">
        <ArrowDown />
      </div> -->
    </div>
    <ul class="options-list" v-if="isOptionOpen">
      <RouterLink :to="'/board/' + currBoard._id + '/main-table'">
        <li class="flex justify-between option" @mousedown="() => onSelect('main-table')">
          <span>Main Table</span>
          <!-- <div class="icon-wrapper">
            <StatusIcon class="icon icon-status" />
          </div> -->
        </li>
      </RouterLink>
      <li class="flex justify-between option" @mousedown="() => onSelect('kanban')">
        <RouterLink :to="'/board/' + currBoard._id + '/kanban'" :class="{ 'kanban-active': columnFilter === 'kanban' }">

          <span>Kanban</span>
          <!-- <div class="icon-wrapper">
            <StatusIcon class="icon icon-status" />
          </div> -->
        </RouterLink>
      </li>

      <RouterLink :to="'/board/' + currBoard._id + '/dashboard'">
        <li class="flex justify-between option" @mousedown="() => onSelect('dashboard')">
          <span>Dashboard</span>
          <!-- <div class="icon-wrapper">
            <StatusIcon class="icon icon-status" />
          </div> -->
        </li>
      </RouterLink>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SelectViewMobile',
  data() {
    return {
      isOptionOpen: false,
      columnFilter: 'main-table',
    }
  },
  methods: {
    toggleOptions() {
      this.isOptionOpen = !this.isOptionOpen
    },
    onSelect(value) {
      this.columnFilter = value
      this.toggleOptions()
      this.$router.push(`/board/${this.currBoard._id}/${this.columnFilter}`)
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
  created() {

  },
  components: {

  },
}
</script>

<style></style>