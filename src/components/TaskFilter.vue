<template>
  <section class="task-filter grid grid-col">
    <div class="btn btn-container grid grid-col aling-center">
      <input v-if="false" placeholder="Search" />
      <SearchIcon class="search-icon icon" />
      <span>Search</span>
    </div>

    <div
      class="btn btn-container grid grid-col aling-center"
      v-tooltip="'Filter by Person'"
    >
      <div class="icon-container">
        <PersonIcon class="person-icon icon" />
      </div>
      <span>Person</span>
    </div>

    <div
      class="btn btn-container grid grid-col aling-center"
      v-tooltip="'Filter by anything'"
    >
      <div class="icon-container">
        <FilterIcon class="filter-icon icon" />
      </div>
      <span>Filter</span>
    </div>
  </section>
</template>

<script>
import SearchIcon from '../assets/icons/Search.svg'
import PersonIcon from '../assets/icons/PersonRound.svg'
import FilterIcon from '../assets/icons/Filter.svg'
export default {
  name: 'TaskFilter',
  components: {
    SearchIcon,
    PersonIcon,
    FilterIcon,
  },
}
</script>
