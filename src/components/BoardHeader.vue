<template>
  <section class="board-header flex-col align-start">
    <div class="board-header-wrapper flex-col align-start">
      <div class="board-header-top-wrapper flex align-center">
        <h2
          contenteditable
          class="board-title"
          @focusout="onChangeTitle($event.target.innerText)"
        >
          {{ currBoard.title }}
        </h2>
        <div class="btn btn-container">
          <InfoIcon class="info-icon icon" />
        </div>
        <div class="btn btn-container">
          <StarIcon class="star-icon icon" />
        </div>
      </div>
      <div class="desc-wrapper">
        <span
          class="desc"
          contenteditable
          @focusout="onChangeDesc($event.target.innerText)"
        >
          {{ currBoard.description }}
        </span>
      </div>
      <nav class="nav-bar flex align-start">
        <RouterLink :to="'/board/' + currBoard._id + '/main-table'">
          <div class="btn btn-container grid grid-col">
            <div class="icon-container">
              <HomeIcon class="home-icon icon" />
            </div>
            <span>Main Table</span>
          </div>
        </RouterLink>
        <RouterLink :to="'/board/' + currBoard._id + '/kanban'">
          <div class="btn btn-container grid grid-col">
            <span>Kanban</span>
          </div>
        </RouterLink>
        <RouterLink :to="'/board/' + currBoard._id + '/dashboard'">
          <div class="btn btn-container grid grid-col">
            <span>Dashboard</span>
          </div>
        </RouterLink>
      </nav>
    </div>
    <div class="seconde-row-container grid grid-col">
      <div class="btn-container btn-add-task grid grid-col aling-center">
        <button @click="addTask" class="btn btn-blue">New Task</button>

        <span class="btn btn-blue task-filter-icon">
          <ArrowDownIcon class="arrow-down-icon icon" />
        </span>
      </div>
      <TaskFilter />
    </div>
  </section>
</template>

<script>
import TaskFilter from './TaskFilter.vue'
import InfoIcon from '../assets/icons/Info.svg'
import StarIcon from '../assets/icons/Favorite.svg'
import FilterIcon from '../assets/icons/Filter.svg'
import HomeIcon from '../assets/icons/Home.svg'
import ArrowDownIcon from '../assets/icons/NavigationChevronDown.svg'

export default {
  name: 'BoardHeader',
  computed: {
    currBoard() {
      return { ...this.$store.getters.currBoard }
    },
  },
  methods: {
    onChangeTitle(txt) {
      this.$emit('updateBoard', 'title', txt)
    },
    onChangeDesc(desc) {
      this.$emit('updateBoard', 'description', desc)
    },
  },
  components: {
    TaskFilter,
    InfoIcon,
    StarIcon,
    FilterIcon,
    HomeIcon,
    ArrowDownIcon,
  },
}
</script>
