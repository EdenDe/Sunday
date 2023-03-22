<template>
  <DraggableNext v-if="currTasks" v-model="currTasks" @moved="changeIndex">
    <section class="task-list" v-for="task, index in currTasks" :key="index">
      <TaskPreview :task="task" />
    </section>
  </DraggableNext>
  <form @submit.prevent="onAddTask" class="add-task-input-container">
    <input placeholder="+ Add task" type="text" v-model="newTask" />
  </form>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import TaskPreview from './TaskPreview.vue';

export default {
  name: 'TaskList',
  props: { tasks: Array, groupId: String },
  data() {
    return {
      newTask: '',
      currTasks: []
    }
  },
  methods: {
    log(event) {
      console.log(event);
      console.log("this.labels:", this.labels);
    },
    changeIndex() {

    },
  },
  created() {
    //console.log("TaskList", this.tasks)
    this.currTasks = this.tasks
  },
  components: {
    TaskPreview,
    DraggableNext: VueDraggableNext,
  },
}
</script>

<style></style>