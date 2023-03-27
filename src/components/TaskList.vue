<template>
  <Container orientation="horizental" @drop="onDrop">
    <Draggable class="task-list" v-for="(task, index) in tasks" :key="index">
      <div class="group-actions-wrapper task-options sticky">
        <div class="svg-wrapper">
          <span
            class="dots-icon"
            @click="
              setTaskActionOpen(taskActionsOpen === null ? task.id : null)
            "
            :class="{ active: taskActionsOpen === task.id }"
          >
            <MenuIcon class="menu-icon icon" />
          </span>
        </div>
        <div class="group-actions">
          <GroupActions
            :taskId="task.id"
            @add="addTaskBelow"
            @copy="copyTask"
            @remove="removeTask"
            v-if="taskActionsOpen === task.id"
          />
        </div>
      </div>
      <div
        class="first-col-color sticky"
        :style="{ backgroundColor: groupBgColor, borderColor: groupBgColor }"
      ></div>
      <TaskPreview :task="task" @updateProp="updateProp" />
    </Draggable>
  </Container>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import TaskPreview from './TaskPreview.vue'
import TaskActionBar from './TaskActionBar.vue'
import GroupActions from '../components/GroupActions.vue'
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
  watch: {
    tasks: {
      handler() {
        this.currTasks = this.tasks
      },
      immediate: true,
    },
  },
  components: {
    TaskPreview,
    Container,
    Draggable,
    TaskActionBar,
    GroupActions,
    TaskActions,
    MenuIcon,
  },
}
</script>
