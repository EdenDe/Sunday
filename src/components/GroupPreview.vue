<template>
  <section class="group-preview">
    <span contenteditable class="group-title" :style="{ color: group.color }">
      {{ group.title }}
    </span>
    <span class="tasks-num">{{ group.tasks.length }} Tasks</span>
    <VueDraggableNext class="group-labels" v-model="labels" @change="log">
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
      titleEdtiable: false,
      labels: [null, 'task', 'status', 'priority', 'members', 'date'],
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
