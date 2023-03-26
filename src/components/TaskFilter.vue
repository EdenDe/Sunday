<template>
  <section class="task-filter grid grid-col">
    <div class="btn btn-container grid grid-col aling-center">
      <input v-if="false" placeholder="Search" />
      <SearchIcon class="search-icon icon" />
      <span>Search</span>
    </div>

    <div class="btn btn-container grid grid-col aling-center">
      <PersonIcon class="person-icon icon" />
      <span>Person</span>
    </div>

    <div class="btn btn-container grid grid-col aling-center">
      <FilterIcon class="filter-icon icon" />
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
