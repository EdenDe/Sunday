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
        <div class="btn-container">
          <i class="info-icon" v-icon="'headerInfo'"></i>
        </div>
        <div class="btn-container">
          <i class="star-icon" v-icon="'headerStar'"></i>
        </div>
      </div>
      <div class="desc-wrapper">
        <p class="desc">Sunday app is a project management...</p>
      </div>
      <nav class="nav-bar flex align-start">
        <RouterLink :to="'/board/' + currBoard._id + '/main-table'">
          <div class="btn btn-container grid grid-col">
            <i class="task-filter-icon" v-icon="'homeHeader'"></i>
            <span>Main Table</span>
          </div>
        </RouterLink>
        <RouterLink :to="'/board/' + currBoard._id + '/kanban'">
          <div
            class="btn btn-container grid grid-col"
            :class="{ 'is-active': $route.params.kanban }"
          >
            <span>Kanban</span>
          </div>
        </RouterLink>
        <div class="btn btn-container grid grid-col">
          <span class="task-filter-icon plus-icon" v-icon="'plusHeader'"></span>
        </div>
      </nav>
    </div>
    <div class="seconde-row-container grid grid-col">
      <div class="btn-container btn-add-task grid grid-col aling-center">
        <button @click="addTask" class="btn btn-blue">New Task</button>

        <span class="btn btn-blue task-filter-icon" v-icon="'arrowDown'"></span>
      </div>
      <TaskFilter />
    </div>
  </section>
</template>

<script>
import TaskFilter from './TaskFilter.vue'
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
  },
  components: {
    TaskFilter,
  },
}
</script>
