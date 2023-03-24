<template>
  <section class="task-pulse">
    <button class="btn-close" v-icon="'closePulse'">X</button>
    <TaskTitle :info="task.taskTitle" />
    <img src="https://cdn.monday.com/images/pulse-page-empty-state.svg" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      task: null
    }
  },
  methods: {

  },
  watch: {
    taskId: {
      handler() {
        debugger
        const groups = this.$store.getters.groups
        const group = groups.find(g => g.id === this.$route.params.groupId)
        const task = group.find(t => t.id === this.taskId)
        if (!task) {

          this.$router.back()
          return
        }
      },
      immediate: true
    }
  },
  computed: {
    taskId() {
      return this.$route.params.taskId
    }
  },
  created() {
    console.log('pusles', this.$route)
  },
  components: {

  },
}
</script>

