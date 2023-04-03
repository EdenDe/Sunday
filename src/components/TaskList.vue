<template>
  <Container orientation="horizental" @drop="onDrop" drag-class="on-drag">
    <component :is="dragCmp" @click="activeTask = task.id" :class="{ active: activeTask === task.id || task.checkbox }"
      class="task-list" v-for="(task, index) in tasks" :key="index">
      <div class="group-actions-wrapper task-options sticky" :style="{ width: '40px' }">
        <div class="svg-wrapper">
          <span class="dots-icon" @click="
            setTaskActionOpen(taskActionsOpen === null ? task.id : null)
          " :class="{ active: taskActionsOpen === task.id }">
            <MenuIcon class="menu-icon icon" />
          </span>
        </div>
        <div class="group-actions">
          <TaskActions :taskId="task.id" @add="addTaskBelow" @copy="copyTask" @remove="removeTask"
            v-if="taskActionsOpen === task.id" />
        </div>
      </div>
      <div class="first-col-color sticky" :style="{
        backgroundColor: groupBgColor,
        borderColor: groupBgColor,
        width: '6px',
      }"></div>
      <TaskPreview :task="task" @updateProp="updateProp" />
      <div></div>
    </component>
  </Container>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import TaskPreview from './TaskPreview.vue'
import TaskActionBar from './TaskActionBar.vue'
import TaskActions from './TaskActions.vue'
import { utilService } from '../services/util.service'
import { boardService } from '../services/board.service'
//ICON
import MenuIcon from '../assets/icons/Menu.svg'
export default {
  name: 'TaskList',
  props: { tasks: Array, groupBgColor: String },
  emits: ['updateProp'],
  data() {
    return {
      taskActionsOpen: null,
      dropPlaceholder: true,
      activeTask: null,
    }
  },
  methods: {
    setTaskActionOpen(value) {
      this.taskActionsOpen = value
    },
    updateProp(taskId, prop, toUpdate) {
      this.$emit('updateProp', taskId, prop, toUpdate)
    },
    onDrop({ addedIndex, removedIndex }) {
      document.activeElement.blur()
      this.currTasks.splice(
        addedIndex,
        0,
        this.currTasks.splice(removedIndex, 1)[0]
      )
      this.updateProp(null, 'tasks', this.currTasks)
    },
    addTaskBelow(taskId) {
      const newTask = boardService.getEmptyTask()
      const index = this.currTasks.findIndex((task) => task.id == taskId)
      this.currTasks.splice(index + 1, 0, newTask)
      this.updateProp(null, 'tasks', this.tasks)
    },
    copyTask(taskId) {
      const newTask = JSON.parse(
        JSON.stringify(this.currTasks.find((task) => task.id == taskId))
      )
      newTask.id = utilService.makeId()
      this.currTasks.push(newTask)
      this.updateProp(null, 'tasks', this.currTasks)
    },
    removeTask(taskId) {
      this.currTasks = this.currTasks.filter((task) => task.id !== taskId)
      this.updateProp(null, 'tasks', this.currTasks)
    },
  },
  computed: {
    dragCmp() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return 'div'
      } else {
        return 'Draggable'
      }
    },
  },
  watch: {
    tasks: {
      handler() {
        this.currTasks = this.tasks
      },
      immediate: true,
    },
    activeTasks: {
      handler() {
        console.log(this.activeTasks)
      },
    },
  },
  components: {
    TaskPreview,
    Container,
    Draggable,
    TaskActionBar,
    TaskActions,
    MenuIcon,
  },
}
</script>
