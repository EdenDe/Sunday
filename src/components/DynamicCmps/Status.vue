<template>
  <div :style="{ backgroundColor: status.color }" class="status flex justify-center align-center">{{ status.taskTitle }}
  </div>
</template>

<script>
export default {
  name: "TaskStatus",
  props: {
    info: String,
  },
  data() {
    return {
      status: null
    }
  },
  created() {
    let labels = this.$store.getters.statusLabels
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

