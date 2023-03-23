<template>
  <section class="group-preview">
    <span contenteditable class="group-title" @focusout="onType($event.target.innerText)" :style="{ color: group.color }">
      {{ group.title }}
    </span>
    <span class="tasks-num">{{ group.tasks.length }} Tasks</span>
    <VueDraggableNext class="group-labels" v-model="labels" @change="log">
      <div v-for="label, index in labels" :key="label">
        <div v-if="index === 0" class="first-col-color" :style="{ backgroundColor: group.color }"> </div>
        {{ label }}
      </div>
    </VueDraggableNext>
    <TaskList :tasks="group.tasks" :groupBgColor="group.color" @updateProp="updateProp" />
    <form @submit.prevent="onAddTask" class="add-task-input-container">
      <input placeholder="+ Add task" type="text" v-model="newTask.taskTitle" />
    </form>
    <ProgressBar :tasks="group.tasks" />
  </section>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
import TaskList from './TaskList.vue'
import ProgressBar from './ProgressBar.vue'

export default {
  name: 'GroupPreview',
  props: {
    group: Object,
  },
  data() {
    return {
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
        taskTitle: ''
      },
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
    }
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
            title: `${title} ${res[title]}/${totalTaskLength} ${presentageWidth.toFixed(1)}%`,
          }
        }
      })

      return res
    },
  },
  watch: {
    group() {
      console.log(this.group)
    }
  },
  components: {
    TaskList,
    VueDraggableNext,
    ProgressBar
  },
}
</script>
