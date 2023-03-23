<template>
  <Container orientation="horizental" @drop="onDrop">
    <Draggable class="task-list" v-for="(task, index) in currTasks" :key="index">
      <div class="first-col-color" :style="{ backgroundColor: groupBgColor, borderColor: groupBgColor }"></div>
      <TaskPreview :task="task" @updateProp="updateProp" />
    </Draggable>
  </Container>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import TaskPreview from './TaskPreview.vue'

export default {
  name: 'TaskList',
  props: { tasks: Array, groupBgColor: String },
  emits: ['updateProp'],
  data() {
    return {
      currTasks: [],
    }
  },
  methods: {
    updateProp(taskId, prop, toUpdate) {
      console.log('toUpdate', toUpdate)
      this.$emit('updateProp', taskId, prop, toUpdate)
    },
    onDrop({ addedIndex, removedIndex }) {
      let taskList = JSON.parse(JSON.stringify(this.tasks))
      taskList.splice(addedIndex, 0, taskList.splice(removedIndex, 1)[0]);
      this.updateProp(null, 'tasks', taskList)
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
  components: {
    TaskPreview,
    Container,
    Draggable,
  },
}
</script>
