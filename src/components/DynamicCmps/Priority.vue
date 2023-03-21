<template>
  <div :style="{ backgroundColor: status.color }" class="priority flex justify-center align-center">{{ status.taskTitle }}
  </div>
</template>

<script>
export default {
  name: "priority",
  props: {
    info: String,
  },
  data() {
    return {
      status: null
    }
  },
  created() {
    let labels = this.$store.getters.priorityLabels
    this.status = labels.find(label => label.taskTitle === this.info)
    if (!this.status) {
      this.status = {
        taskTitle: "",
        color: "#c4c4c4"
      }
    }
  },
  computed: {
    statusList() {

    }
  }
};
</script>

