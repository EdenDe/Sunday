<template>
  <section class="board-header">
    <div class="tool-bar grid grid-col">
      <div class="title-container">
        <h2 contenteditable="true" class="board-header-title">Sunday</h2>
      </div>
      <nav class="">
        <button class="btn">
          <i v-icon="'home'"></i>
          <span>Main Table</span>
        </button>
        <button class="btn">Kaban</button>
        <button class="btn">+</button>
      </nav>
    </div>
    <TaskFilter></TaskFilter>
  </section>
</template>

<script>
import TaskFilter from './TaskFilter.vue'
export default {
  name: 'BoardHeader',
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {},
  components: {
    TaskFilter,
  },
}
</script>

<style></style>
