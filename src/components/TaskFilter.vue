<template>
  <section class="task-filter grid grid-col">
    <div class="btn-container btn-add-task grid grid-col aling-center">
      <span class="btn btn-blue">New Task</span>
      <span class="btn btn-blue task-filter-icon" v-icon="'arrowDown'"></span>
    </div>

    <div class="btn btn-container grid grid-col aling-center">
      <input v-if="false" placeholder="Search" />
      <span class="task-filter-icon" v-icon="'searchFilter'"></span>
      <span>Search</span>
    </div>

    <div class="btn btn-container grid grid-col aling-center">
      <span class="task-filter-icon" v-icon="'person'"></span>
      <span>Person</span>
    </div>

    <div class="btn btn-container grid grid-col aling-center">
      <span class="task-filter-icon" v-icon="'filter'"></span>
      <span>Filter</span>
      <!-- <span class="task-filter-icon" v-icon="'arrowDownGrey'"></span> -->
    </div>
  </section>
</template>

<script>
export default {
  name: 'TaskFilter',
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {},
  components: {},
}
</script>

<style></style>
