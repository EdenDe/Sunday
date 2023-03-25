<template>
  <section class="task-pulse">
    <header class="grid">
      <button class="btn btn-close" v-icon="'closePulse'" @click="onBack">
        X
      </button>
      <div>
        <span
          contenteditable
          v-if="task"
          class="task-title"
          :style="{ fontSize: '24px' }"
        >
          {{ task.taskTitle }}
        </span>
      </div>
      <div class="tabs-wrapper flex align-center">
        <div
          class="btn-tab-wrapper"
          :class="{ 'active-tab': activeTab === 'updateLog' }"
        >
          <button class="btn btn-tab" @click="activeTab = 'updateLog'">
            <i class="task-update-icon" v-icon="'homeHeader'"></i>
            Updates
          </button>
        </div>
        <div class="border"></div>
        <div
          class="btn-tab-wrapper"
          :class="{ 'active-tab': activeTab === 'activityLog' }"
          @click="activeTab = 'activityLog'"
        >
          <button class="btn btn-tab">Activity Log</button>
        </div>
      </div>
    </header>
    <main class="content-wrapper">
      <component :is="activeTab" />
    </main>

    <!-- <img src="https://cdn.monday.com/images/pulse-page-empty-state.svg" /> -->
  </section>
</template>

<script>
import UpdateLog from '../components/UpdateLog.vue'
import ActivityLog from '../components/ActivityLog.vue'

export default {
  data() {
    return {
      task: null,
      activeTab: 'updateLog',
    }
  },
  methods: {
    getTask() {
      const groups = this.$store.getters.groups
      if (groups) {
        let task
        groups.forEach((group) => {
          task = group.tasks.find((t) => t.id === this.taskId)

          if (task) {
            this.task = task
          }
        })
      }
    },
    onBack() {
      this.$router.back()
    },
  },
  computed: {
    taskId() {
      return this.$route.params.taskId
    },
  },
  created() {
    this.getTask()
  },
  watch: {
    taskId() {
      this.getTask()
    },
  },
  components: {
    UpdateLog,
    ActivityLog,
  },
}
</script>
