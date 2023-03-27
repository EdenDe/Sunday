<template>
  <section class="task-filter grid grid-col">
    <div class="filter-search filter" ref="search">
      <button class="btn btn-container" @click="toggleFilter($event)">
        <input v-if="false" placeholder="Search" />
        <div class="icon-container">
          <SearchIcon class="search-icon icon" />
        </div>
        <span>Search</span>
      </button>
      <div class="filter-modal">Filter</div>
    </div>

    <div class="filter-person filter" ref="person">
      <button class="btn btn-container" @click="toggleFilter($event)">
        <div class="icon-container">
          <PersonIcon class="person-icon icon" />
        </div>
        <span>Person</span>
      </button>
      <div class="filter-modal">Filter</div>
    </div>

    <div class="btn btn-container grid grid-col aling-center">
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
import SortIcon from '../assets/icons/Sort.svg'
export default {
  name: 'TaskFilter',
  methods: {
    toggleFilter(event) {
      event.target.parentNode.parentNode.classList.toggle('active')
    },
  },
  components: {
    SearchIcon,
    PersonIcon,
    FilterIcon,
    SortIcon,
  },
}
</script>
