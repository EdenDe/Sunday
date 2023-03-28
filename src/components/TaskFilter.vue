<template>
  <section class="task-filter grid grid-col" v-clickOutside="toggleFilter">
    <div
      class="filter-search filter"
      ref="search"
      :class="{ active: activeFilter === 'search' }"
    >
      <button class="btn btn-container" @click="toggleFilter('search')">
        <div class="icon-container">
          <SearchIcon class="search-icon icon" />
        </div>
        <span
          class="flex align-center justify-start search-input"
          contenteditable
          ref="groupTitle"
        >
          {{ filterBy.txt }}
        </span>
      </button>
    </div>

    <div
      class="filter-member filter"
      :class="{ active: activeFilter === 'member' }"
    >
      <button class="btn btn-container" @click="toggleFilter('member')">
        <div class="icon-container">
          <MemberIcon class="member-icon icon" />
        </div>
        <span>Member</span>
      </button>
      <div class="filter-modal">
        <MemberFilter @setFilterBy="setFilterBy" />
      </div>
    </div>

    <div
      class="filter-main filter"
      ref="member"
      :class="{ active: activeFilter === 'main' }"
    >
      <button class="btn btn-container" @click="toggleFilter('main')">
        <div class="icon-container">
          <FilterIcon class="filter-icon icon" />
        </div>
        <span>Filter</span>
      </button>
      <div class="filter-modal">
        <MainFilter />
      </div>
    </div>
    <div
      class="filter-sort filter"
      ref="sort"
      :class="{ active: activeFilter === 'sort' }"
    >
      <button class="btn btn-container" @click="toggleFilter('sort')">
        <div class="icon-container">
          <SortIcon class="filter-icon icon" />
        </div>
        <span>Sort</span>
      </button>
      <div class="filter-modal">
        <SortFilter />
      </div>
    </div>
  </section>
</template>

<script>
import SearchIcon from '../assets/icons/Search.svg'
import MemberIcon from '../assets/icons/PersonRound.svg'
import FilterIcon from '../assets/icons/Filter.svg'
import SortIcon from '../assets/icons/Sort.svg'
import MemberFilter from './filterCmps/FilterMember.vue'
import SortFilter from './filterCmps/FilterSort.vue'
import MainFilter from './filterCmps/FilterMain.vue'

export default {
  name: 'TaskFilter',
  data() {
    return {
      filterBy: {
        txt: 'Search',
      },
      activeFilter: null,
    }
  },
  methods: {
    toggleFilter(value = null) {
      this.activeFilter = value
    },
    setFilterBy(filter) {
      console.log(filter)
    },
  },
  components: {
    SearchIcon,
    MemberIcon,
    FilterIcon,
    SortIcon,
    MemberFilter,
    SortFilter,
    MainFilter,
  },
}
</script>
