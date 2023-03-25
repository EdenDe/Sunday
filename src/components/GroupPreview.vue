<template>
  <section class="group-preview">
    <div class="grid-title flex align-items">
      <div class="svg-wrapper"></div>
      <div class="group-title-wrapper flex align-center">
        <span
          contenteditable
          class="group-title"
          @focusout="onType($event.target.innerText)"
          :style="{ color: group.color }"
        >
          {{ group.title }}
        </span>
        <span class="tasks-num flex align-items justify-start"
          >{{ group.tasks.length }} Tasks</span
        >
      </div>
    </div>
    <Container class="group-labels">
      <Draggable v-for="(label, index) in labels" :key="label">
        <div
          v-if="index === 1"
          class="first-col-color"
          :style="{ backgroundColor: group.color }"
        ></div>
        {{ label }}
      </Draggable>
    </Container>

    <TaskList
      :tasks="group.tasks"
      :groupBgColor="group.color"
      @updateProp="updateProp"
    />
    <div class="add-task-container sticky">
      <div class="task-option"></div>
      <div
        class="first-col-color"
        :style="{ backgroundColor: group.color }"
      ></div>
      <Checkbox />
      <form @submit.prevent="onAddTask" class="add-task-input-container">
        <input
          placeholder="+ Add task"
          type="text"
          v-model="newTask.taskTitle"
        />
      </form>
    </div>
    <ProgressBar :tasks="group.tasks" />
  </section>
</template>

<script>
import TaskList from './TaskList.vue'
import Checkbox from './dynamicCmps/Checkbox.vue'
import ProgressBar from './ProgressBar.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
  name: 'GroupPreview',
  props: {
    group: Object,
  },
  data() {
    return {
      // labels: [
      //   null,
      //   null,
      //   'task',
      //   'status',
      //   'priority',
      //   'person',
      //   'date',
      //   'timeline',
      //   'file',
      // ],
      newTask: {
        taskTitle: '',
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
    },
    onDrop(dropResult) {
      this.items = this.applyDrag(this.items, dropResult)
    },
  },
  computed: {
    labels() {
      let labels = [null, null, null]
      labels.push(...this.$store.getters.cmpOrder.slice(1))

      return labels.map((label) => {
        if (label === 'taskTitle') label = 'title'
        if (label === 'txt') label = 'text'
        return label
      })
    },
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
    ProgressBar,
    Container,
    Draggable,
    Checkbox,
  },
}
</script>
