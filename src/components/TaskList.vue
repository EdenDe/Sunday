<template>
  <DraggableNext v-if="currTasks" v-model="displayTask">
    <section class="task-list" v-for="(task, index) in displayTask" :key="index">
      <div class="first-col-color" :style="{ backgroundColor: groupBgColor, borderColor: groupBgColor }"> </div>
      <TaskPreview :task="task" @updateProp="updateProp" />
    </section>
  </DraggableNext>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import TaskPreview from "./TaskPreview.vue";

export default {
  name: "TaskList",
  props: { tasks: Array, groupBgColor: String },
  emits: ['updateProp'],
  data() {
    return {
      currTasks: [],
    };
  },
  methods: {
    updateProp(taskId, prop, toUpdate) {
      this.$emit('updateProp', taskId, prop, toUpdate)
    }
  },
  computed: {
    displayTask:
    {
      get() {
        return this.currTasks
      },
      set(value) {
        this.updateProp(null, 'tasks', value)
        this.currTasks = value
      }
    }
  },
  watch: {
    tasks: {
      handler(tasks) {
        this.currTasks = tasks;
      },
      immediate: true
    }
  },
  components: {
    TaskPreview,
    DraggableNext: VueDraggableNext,
  },
};
</script>
