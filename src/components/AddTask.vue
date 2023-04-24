<template>
  <div class="add-task-container">
    <div class="task-option"></div>
    <div class="first-col-color" :style="{ backgroundColor: groupClr }"></div>
    <Checkbox />

    <form @submit.prevent="onAddTask" class="add-task-input-container sticky">
      <input @focusout="onAddTask" placeholder="+ Add task" type="text" v-model="taskTitle" />
    </form>
  </div>
</template>

<script>
import Checkbox from './dynamicCmps/Checkbox.vue'

export default {
  props: {
    groupClr: String
  },
  name: "AddTask",
  data() {
    return {
      taskTitle: "",
    };
  },
  methods: {
    onAddTask() {
      if (this.taskTitle === "")
        return;
      this.$emit("addTask", this.taskTitle);
      this.taskTitle = "";
    }
  },
  components: { Checkbox }
}
</script>
