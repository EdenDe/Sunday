<template>
  <section class="group-preview">
    <VueDraggableNext class="labels-grid" v-model="labels" @change="log">
      <div v-for="label in labels" :key="label">{{ label }}</div>
    </VueDraggableNext>

    <TaskList :tasks="group.tasks" />
    <section class="progress-grid">
      <div v-for="(item, idx) in progress" :key="idx">{{ item }}</div>
    </section>
  </section>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
import TaskList from './TaskList.vue'

export default {
  name: 'GroupPreview',
  props: {
    group: Object,
  },
  data() {
    return {
      labels: ['groupName', null, 'status', 'members', 'priority', 'date'],
      progress: [null, null, 'status', null, 'priority', null],
    }
  },
  methods: {
    log(event) {
      console.log(event)
      console.log('this.labels:', this.labels)
    },
    onDrop(ev) {
      console.log(ev)
    },
    start(ev) {
      console.log(':start', ev)
    },
  },
  computed: {},
  created() {
    console.log('GroupPreview', this.group)
  },
  components: {
    TaskList,
    VueDraggableNext,
  },
}
</script>

<style></style>
