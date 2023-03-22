<template>
  <section class="group-preview">
    <span contenteditable class="group-title" :style="{ color: group.color }">
      {{ group.title }}
    </span>
    <span class="tasks-num">{{ group.tasks.length }} Tasks</span>
    <VueDraggableNext class="group-labels" v-model="labels" @change="log">
      <div v-for="label in labels" :key="label">{{ label }}</div>
    </VueDraggableNext>

    <TaskList :tasks="group.tasks" :groupId="group.id" />

    <section class="progress-grid">
      <div v-for="(item, idx) in progress" :key="idx">
        <div v-if="item === 'status'" class="flex status-progress-container">
          <div v-for="status in groupStatusProgress"
            :style="{ flex: 1, 'flex-basis': status.width, backgroundColor: status.color }" />
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
      labels: [null, null, 'task', 'status', 'priority', 'person', 'date', 'timeline', 'file'],
      progress: [null, null, null, 'status', 'priority', null, null, null, null],
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
          let presentageWidth = (res[taskTitle] / totalTaskLength) * 100

          res[taskTitle] = {
            width: Math.round(presentageWidth) + '%',
            color: color,
            title: `${taskTitle} ${res[taskTitle]}/${totalTaskLength} ${presentageWidth.toFixed(1)}%`
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

