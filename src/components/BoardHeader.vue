<template>
  <section class="board-header">
    <div class="tool-bar grid">
      <h2
        contenteditable
        class="board-header-title"
        @focusout="onChangeTitle($event.target.innerText)"
      >
        {{ currBoard.title }}
      </h2>
      <nav class="nav-bar grid grid-col">
        <RouterLink :to="'/board/' + currBoard._id + '/main-table'">
          <div class="btn btn-container grid grid-col">
            <span class="task-filter-icon" v-icon="'homeHeader'"></span>
            <span>Main Table</span>
          </div>
        </RouterLink>
        <RouterLink :to="'/board/' + currBoard._id + '/kanban'">
          <div class="btn btn-container grid grid-col">
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
