<template>
  <section class="task-filter grid grid-col" v-clickOutside="toggleFilter">
    <div class="filter-search filter" ref="search" :class="{ active: activeFilter === 'search' }">
      <button class="btn btn-container" @click="() => toggleFilter('search')">
        <div class="icon-container">
          <SearchIcon class="search-icon icon" />
        </div>
        <input placeholder="Search" v-model="txt" @input="() => setText('txt', txt)"
          class="flex align-center justify-start search-input" :class="{ typing: txt.length > 0 }" />
      </button>
    </div>

    <div class="filter-member filter" :class="{ active: activeFilter === 'member' }">
      <button class="btn btn-container" @click="() => toggleFilter(activeFilter === 'member' ? null : 'member')"
        v-tooltip="'Filter by person'">
        <div class="icon-container">
          <MemberIcon class="member-icon icon" />
        </div>
        <span>Person</span>
      </button>
      <div class="filter-modal">
        <MemberFilter @setFilterBy="setFilterBy" :filterPerson="filterBy.person" />
      </div>
    </div>

    <div class="filter-main filter" ref="member" :class="{ active: activeFilter === 'main' }">
      <button class="btn btn-container" @click="() => toggleFilter(activeFilter === 'main' ? null : 'main')"
        v-tooltip="'Filter by anything'">
        <div class="icon-container">
          <FilterIcon class="filter-icon icon" />
        </div>
        <span>Filter</span>
      </button>
      <div class="filter-modal">
        <MainFilter @setFilterBy="setFilterBy" :filter="filterBy" />
      </div>
    </div>
    <div class="filter-sort filter" ref="sort" :class="{ active: activeFilter === 'sort' }">
      <button class="btn btn-container" @click="() => toggleFilter(activeFilter === 'sort' ? null : 'sort')">
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
import { utilService } from '../services/util.service'

export default {
  name: 'TaskFilter',
  data() {
    return {
      txt: '',
      activeFilter: null,
    }
  },
  methods: {
    toggleFilter(value = null) {
      this.activeFilter = value
    },
    setText(by, value) {
      utilService.debounce(this.setFilterBy({ by, value }), 500)
    },
    setFilterBy({ by, value }) {
      const filter = JSON.parse(JSON.stringify(this.filterBy))

      if (by === 'txt') {
        filter.txt = value
      } else {
        const index = filter[by].findIndex(b => b === value)
        if (index === -1) {
          filter[by].push(value)
        } else {
          filter[by].splice(index, 1)
        }
      }

      this.$emit('setFilter', filter)
    }
  },
  computed: {
    filterBy() {
      return this.$store.getters.filterBy
    }
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
