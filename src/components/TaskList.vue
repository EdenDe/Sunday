<template>
  <DraggableNext v-if="currTasks" v-model="currTasks" @moved="changeIndex">
    <section class="task-list" v-for="(task, index) in currTasks" :key="index">
      <TaskPreview :task="task" @updateProp="updateProp" />
    </section>
  </DraggableNext>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import TaskPreview from "./TaskPreview.vue";

export default {
  name: "TaskList",
  props: { tasks: Array },
  data() {
    return {
      currTasks: [],
    };
  },
  methods: {
    log(event) {
      console.log(event);
      console.log("this.labels:", this.labels);
    },
    changeIndex() {

    },
    updateProp(taskId, prop, toUpdate) {

      this.$emit('updateProp', taskId, prop, toUpdate)
    }
  },
  created() {
    //console.log("TaskList", this.tasks)
    this.currTasks = this.tasks;
  },
  components: {
    TaskPreview,
    DraggableNext: VueDraggableNext,
  },
  emits: ['updateProp']
};
</script>

<style></style>
