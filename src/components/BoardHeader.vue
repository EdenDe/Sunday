<template>
  <section class="board-header">
    <div class="tool-bar grid grid-col">
      <h2 contenteditable="true" class="board-header-title">Sunday</h2>
      <nav class="nav-bar grid grid-col">
        <div class="btn btn-container grid grid-col aling-center">
          <span class="task-filter-icon" v-icon="'home'"></span>
          <span>Main Table</span>
        </div>
        <div class="btn btn-container grid grid-col aling-center">
          <span>Kaban</span>
        </div>
        <div class="btn btn-container grid grid-col aling-center">
          <span class="task-filter-icon" v-icon="'plusHeader'"></span>
        </div>
      </nav>
    </div>
    <TaskFilter />
  </section>
</template>

<script>
import TaskFilter from './TaskFilter.vue'
export default {
  name: 'BoardHeader',
  components: {
    TaskFilter,
  },
}
</script>

