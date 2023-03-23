<template>
  <Container @drop="onDrop">

    <section class="task-list" v-for="(task, index) in currTasks" :key="index">
      <div class="first-col-color" :style="{ backgroundColor: groupBgColor, borderColor: groupBgColor }"></div>
      <TaskPreview :task="task" @updateProp="updateProp" />

    </section>

  </Container>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
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
      this.$emit('updateProp', taskId, prop, toUpdate)
    },
    onDrop(dropResult) {
      debugger
      this.items = this.applyDrag(this.items, dropResult);
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
    }
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
