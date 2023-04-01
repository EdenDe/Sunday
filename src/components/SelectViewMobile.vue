<template>
  <div class="mobile-view-select">
    <div class="filter-select-input flex align-center" @click="toggleOptions">

      <div class="icon-wrapper flex align-center">
        <component :is="(columnFilter === 'main-table' ? 'mainTable' : columnFilter) + 'Icon'" class="home-icon icon" />
      </div>
      <span>{{ columnFilter === 'main-table' ? 'main table' : columnFilter }}</span>

      <div class="icon-arrow">
        <ArrowDown />
      </div>
    </div>
    <ul class="options-list" v-if="isOptionOpen" v-clickOutside="toggleOptions">
      <RouterLink :to="'/board/' + currBoard._id + '/main-table'">
        <li class="grid option" @mousedown="() => onSelect('main-table')">
          <div class="icon-wrapper flex align-center">
            <mainTableIcon class="icon" />
          </div>
          <span>Main Table</span>
        </li>
      </RouterLink>

      <RouterLink :to="'/board/' + currBoard._id + '/kanban'" :class="{ 'kanban-active': columnFilter === 'kanban' }">
        <li class="grid option" @mousedown="() => onSelect('kanban')">
          <div class="icon-wrapper flex align-center">
            <kanbanIcon class="icon" />
          </div>
          <span>Kanban</span>
        </li>
      </RouterLink>

      <RouterLink :to="'/board/' + currBoard._id + '/dashboard'">
        <li class="grid option" @mousedown="() => onSelect('dashboard')">
          <div class="icon-wrapper flex align-center">
            <dashboardIcon class="icon-status" />
          </div>
          <span>Dashboard</span>
        </li>
      </RouterLink>
    </ul>
  </div>
</template>

<script>
import mainTableIcon from '../assets/icons/Home.svg'
import dashboardIcon from '../assets/icons/Dashboard.svg'
import kanbanIcon from '../assets/icons/Kanban.svg'
import ArrowDown from '../assets/icons/ArrowDown.svg'

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
  components: {
    mainTableIcon,
    dashboardIcon,
    kanbanIcon,
    ArrowDown
  },
}
</script>
