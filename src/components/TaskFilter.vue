<template>
  <section class="task-filter grid grid-col">
    <div class="btn-blue btn-add-task grid grid-col">
      <button class="btn btn-blue">New Task</button>
      <div class="btn btn-blue btn-dropdown">V</div>
    </div>

    <input v-if="false" placeholder="Search" />
    <button class="btn">Search</button>
    <button class="btn">Person</button>
    <button class="btn">Filter</button>
    <button class="btn">Sort</button>
    <button class="btn">Hide</button>
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
