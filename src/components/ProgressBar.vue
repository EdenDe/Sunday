<template>
  <section class="progress-grid justify-center">
    <div v-for="(item, idx) in progress" :key="idx">
      <div v-if="item === 'status'" class="flex status-progress-container">
        <div
          v-for="status in groupStatusProgress"
          :style="{
            flex: 1,
            'flex-basis': status.width,
            backgroundColor: status.color,
          }"
        ></div>
      </div>
    </div>
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
      labels: [
        null,
        null,
        'task',
        'status',
        'priority',
        'person',
        'date',
        'timeline',
        'file',
      ],
      newTask: {
        taskTitle: '',
      },
      progress: [
        null,
        null,
        null,
        'status',
        'priority',
        null,
        null,
        null,
        null,
      ],
    }
  },
  methods: {
    log(event) {
      console.log(event)
    },
    onType(txt) {
      this.updateProp(null, 'title', txt)
    },
    updateProp(taskId, prop, toUpdate) {
      this.$store.dispatch({
        type: 'updateCurrBoard',
        groupId: this.group.id,
        taskId,
        prop,
        toUpdate,
      })
    },
    onAddTask() {
      let group = JSON.parse(JSON.stringify(this.group))
      group.tasks.push({ ...this.newTask })
      this.updateProp(null, 'tasks', group.tasks)
      this.newTask.taskTitle = ''
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

      statusLabel.map(({ title, color }) => {
        if (res[title]) {
          let presentageWidth = (res[title] / totalTaskLength) * 100

          res[title] = {
            width: Math.round(presentageWidth) + '%',
            color: color,
            title: `${title} ${
              res[title]
            }/${totalTaskLength} ${presentageWidth.toFixed(1)}%`,
          }
        }
      })

      return res
    },
  },
  watch: {
    group() {
      console.log(this.group)
    },
  },
  components: {
    TaskList,
    VueDraggableNext,
  },
}
</script>
