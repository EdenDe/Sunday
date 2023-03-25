<template>
  <section class="task-pulse">
    <button class="btn-close" v-icon="'closePulse'">X</button>
    <input v-model="task.taskTitle" />
    <img src="https://cdn.monday.com/images/pulse-page-empty-state.svg" />
  </section>
</template>

<script>
import TitleInput from '../components/dynamicCmps/TitleInput.vue'

export default {
  data() {
    return {
      task: null
    }
  },
  methods: {

  },
  computed: {
    taskId() {
      return this.$route.params.taskId
    }
  },
  async created() {
    const groups = await this.$store.getters.groups
    debugger
    let task
    groups.forEach(group => {
      task = group.tasks.find(t => t.id === this.taskId)

      if (task) {
        this.task = task
      }
    })
  },
  components: {
    TitleInput
  },
}
</script>

