<template>
  <section class="group-preview">
    <div class="grid-title flex align-items">
      <div class="svg-wrapper"></div>
      <div class="group-title-wrapper flex align-center">
        <span contenteditable class="group-title" @focusout="onAddTask($event.target.innerText)"
          :style="{ color: group.color }">
          {{ group.title }}
        </span>
        <span class="tasks-num flex align-items justify-start">{{ tasksNumber }} Tasks</span>
      </div>
    </div>
    <Container class="group-labels">
      <Draggable v-for="(label, index) in labels" :key="label" class="group-label" :class="label">
        <div v-if="index === 1" class="first-col-color" :style="{ backgroundColor: group.color }"></div>
        <div v-if="index === 2" class="group-checkbox">
          <Checkbox :info="groupCheckbox" @updateProp="toggleSelectGroup" />
        </div>
        {{ label }}
      </Draggable>
    </Container>

    <TaskList :tasks="group.tasks" :groupBgColor="group.color" @updateProp="updateProp" />
    <div class="add-task-container sticky">
      <div class="task-option"></div>
      <div class="first-col-color" :style="{ backgroundColor: group.color }"></div>
      <Checkbox />
      <form @submit.prevent="onAddTask" class="add-task-input-container">
        <input placeholder="+ Add task" type="text" v-model="newTask.taskTitle" />
      </form>
    </div>
    <ProgressBar :tasks="group.tasks" />
    <TaskActionBar v-if="isActionBarOpen" :selectedTasksNum="selectedTasksNum" @closeActionBar="closeActionBar"
      @remove="removeTasks" @copy="copyTasks"></TaskActionBar>
  </section>
</template>

<script>
import TaskList from './TaskList.vue'
import Checkbox from './dynamicCmps/Checkbox.vue'
import ProgressBar from './ProgressBar.vue'
import TaskActionBar from './TaskActionBar.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { utilService } from '../services/util.service'
import { boardService } from '../services/board.service'

export default {
  name: 'GroupPreview',
  props: {
    group: Object,
  },
  data() {
    return {
      isActionBarOpen: false,
      selectedTasks: [],
      newTask: boardService.getEmptyTask(),
      groupCheckbox: false
    }
  },
  methods: {
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

      this.newTask.id = utilService.makeId()
      this.newTask.taskTitle = ''
    },
    removeTasks() {
      this.group.tasks = this.group.tasks.filter(
        (t) => !this.selectedTasks.includes(t.id)
      )
      this.updateProp(null, 'tasks', this.group.tasks)
    },
    toggleSelectGroup(prop, value) {
      this.group.tasks.forEach((task) => this.updateProp(task.id, prop, value))
    },
    copyTasks() {
      const tasks = []
      this.group.tasks.forEach((task) => {
        if (this.selectedTasks.includes(task.id)) {
          let newTask = { ...task }
          newTask.id = utilService.makeId()
          tasks.push(newTask)
        }
      })

      this.group.tasks.push(...tasks)
      this.updateProp(null, 'tasks', this.group.tasks)
      this.closeActionBar()
    },
    closeActionBar() {
      this.toggleSelectGroup('checkbox', false)
    },
  },
  computed: {
    labels() {
      let labels = [null, null, null]
      labels.push(
        ...this.$store.getters.cmpOrder.slice(1).map((cmp) => cmp.name)
      )

      return labels.map((label) => {
        if (label === 'taskTitle') label = 'task'
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
            title: `${title} ${res[title]
              }/${totalTaskLength} ${presentageWidth.toFixed(1)}%`,
          }
        }
      })

      return res
    },
    selectedTasksNum() {
      return this.selectedTasks.length
    },
    tasksNumber() {
      if (this.group.tasks?.length) return this.group.tasks.length
      else return 'No '
    },
  },
  watch: {
    group: {
      handler() {
        this.selectedTasks = this.group.tasks
          .filter((t) => t.checkbox)
          .map((t) => t.id)
        if (!this.selectedTasks.length) {
          this.isActionBarOpen = false
          this.groupCheckbox = false
        } else {
          this.isActionBarOpen = true
          this.groupCheckbox =
            this.group.tasks.length === this.selectedTasks.length
        }
      },
      immediate: true,
      deep: true,
    },
  },
  components: {
    TaskList,
    ProgressBar,
    Container,
    Draggable,
    Checkbox,
    TaskActionBar,
  },
}
</script>
