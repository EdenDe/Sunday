<template>
  <Container orientation="horizental" @drop="onDrop">
    <Draggable
      class="task-list"
      v-for="(task, index) in currTasks"
      :key="index"
    >
      <div class="task-options sticky"></div>
      <div
        class="first-col-color sticky"
        :style="{ backgroundColor: groupBgColor, borderColor: groupBgColor }"
      ></div>
      <TaskPreview
        :task="task"
        @updateProp="updateProp"
        @toggleTask="onToggleTask"
      />
    </Draggable>
  </Container>
  <TaskActionBar
    v-if="isActionBarOpen"
    :selectedTasksNum="selectedTasksNum"
    @closeActionBar="closeActionBar"
    @remove="removeTasks"
  ></TaskActionBar>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import TaskPreview from './TaskPreview.vue'
import TaskActionBar from './TaskActionBar.vue'

export default {
  name: 'TaskList',
  props: { tasks: Array, groupBgColor: String },
  emits: ['updateProp'],
  data() {
    return {
      currTasks: [],
      isActionBarOpen: false,
      selectedTasks: [],
    }
  },
  methods: {
    updateProp(taskId, prop, toUpdate) {
      // console.log('toUpdate', toUpdate)
      this.$emit('updateProp', taskId, prop, toUpdate)
    },
    removeTasks() {
      this.currTasks = this.currTasks.filter(
        (t) => !this.selectedTasks.includes(t.id)
      )
      this.updateProp(null, 'tasks', this.currTasks)
      this.closeActionBar()
    },
    onDrop({ addedIndex, removedIndex }) {
      let taskList = JSON.parse(JSON.stringify(this.tasks))
      taskList.splice(addedIndex, 0, taskList.splice(removedIndex, 1)[0])
      this.updateProp(null, 'tasks', taskList)
    },
    onToggleTask(taskId, isChecked) {
      if (isChecked) this.selectedTasks.push(taskId)
      else {
        const idx = this.selectedTasks.findIndex((t) => t === taskId)
        this.selectedTasks.splice(idx, 1)
      }

      if (!this.selectedTasks.length) this.closeActionBar()
      else if (this.isActionBarOpen) return
      else this.isActionBarOpen = true
    },
    closeActionBar() {
      this.isActionBarOpen = false
      this.selectedTasks = []
    },
  },
  watch: {
    tasks: {
      handler(tasks) {
        this.currTasks = tasks
      },
      immediate: true,
    },
  },
  computed: {
    selectedTasksNum() {
      return this.selectedTasks.length
    },
  },
  components: {
    TaskPreview,
    Container,
    Draggable,
    TaskActionBar,
  },
}
</script>
