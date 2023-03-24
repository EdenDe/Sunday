<template>
  <section class="task-filter grid grid-col">
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
  methods: {
    addTask() {
      //q- איך להוסיף מפה בצורה הכי טובה
    },
  },
}
</script>
