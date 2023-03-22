<template>
  <section class="group-preview">
    <span contenteditable class="group-title" :style="{ color: group.color }" :data-tasks-count="group.tasks.length">
      {{ group.title }}
    </span>
    <VueDraggableNext class="group-labels" v-model="labels" @change="log">
      <div v-for="label in labels" :key="label">{{ label }}</div>
    </VueDraggableNext>

    <TaskList :tasks="group.tasks" />
    <section class="progress-grid">
      <div v-for="(item, idx) in progress" :key="idx">
        <div v-if="item === 'status'" class="flex status-progress-container">
          <div v-for="status in groupStatusProgress" :style="{ width: status.width, backgroundColor: status.color }">
          </div>
        </div>
      </div>
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
      progress: [null, null, 'status', 'priority', null, null],
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
  computed: {
    groupStatusProgress() {
      let res = this.group.tasks.reduce((obj, { status }) => {
        if (!obj[status]) obj[status] = 0
        obj[status] += 1
        return obj
      }, {})

      let statusLabel = this.$store.getters.statusLabels
      let totalTaskLength = this.group.tasks.length

      statusLabel.map(({ taskTitle, color }) => {
        if (res[taskTitle]) {
          let presentageWidth = ((res[taskTitle] / totalTaskLength) * 100).toFixed(1) + '%'
          res[taskTitle] = {
            width: presentageWidth,
            color: color,
            title: `${taskTitle} ${res[taskTitle]}/${totalTaskLength} ${presentageWidth}`
          }
        }
      })

      return res
    }

  },
  components: {
    TaskList,
    VueDraggableNext,
  }
}
</script>

