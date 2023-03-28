<template>
  <section class="task-pulse">
    <header class="grid">
      <button class="btn btn-close" @click="onBack">
        <CloseIcon class="close-icon icon" />
      </button>
      <div>
        <span contenteditable class="task-title">
          {{ task.taskTitle }}
        </span>
      </div>
      <div class="tabs-wrapper flex align-center">
        <div class="btn-tab-wrapper" :class="{ 'active-tab': activeTab === 'updateLog' }">
          <button class="btn btn-tab" @click="activeTab = 'updateLog'" v-tooltip="'Updates / ' + task.updates?.length">
            <div class="task-update-icon">
              <HomeIcon class="home-icon icon" />
            </div>
            Updates
          </button>
        </div>
        <div class="border"></div>
        <div class="btn-tab-wrapper" :class="{ 'active-tab': activeTab === 'activityLog' }" v-tooltip="'Activity Log'"
          @click="activeTab = 'activityLog'">
          <button class="btn btn-tab">Activity Log</button>
        </div>
      </div>
    </header>
    <main class="content-wrapper">
      <UpdateLog v-if="activeTab === 'updateLog'" :loggedInUserId="loggedInUser._id"
        :updates="task.updates ? task.updates : []" @updateTask="updateTask" />
      <ActivityLog v-if="activeTab === 'activityLog'" :activities="activities" />
    </main>

    <!-- <img src="https://cdn.monday.com/images/pulse-page-empty-state.svg" /> -->
  </section>
</template>

<script>
import UpdateLog from '../components/UpdateLog.vue'
import ActivityLog from '../components/ActivityLog.vue'
import CloseIcon from '../assets/icons/Close.svg'
import HomeIcon from '../assets/icons/Home.svg'
import { userService } from '../services/user.service'
import { utilService } from '../services/util.service'
export default {
  data() {
    return {
      groupId: null,
      activeTab: 'updateLog',
      loggedInUser: null
    }
  },
  methods: {
    onBack() {
      this.$router.push(`/board/${this.$route.params.boardId}/main-table`)
    },
    updateTask(prop, toUpdate) {
      this.$store.dispatch({ type: 'updateCurrBoard', groupId: this.groupId, taskId: this.task.id, prop, toUpdate })
    }
  },
  computed: {
    taskId() {
      return this.$route.params.taskId
    },
    task() {
      const groups = this.$store.getters.groups
      if (groups) {
        for (let i = 0; i < groups.length; i++) {
          let currTask = groups[i].tasks.find((t) => t.id === this.taskId)
          if (currTask) {
            this.groupId = groups[i].id
            return JSON.parse(JSON.stringify(currTask))
          }
        }
        this.onBack()
      }
    },
    activities() {
      let activities = this.$store.getters.activities
      return activities.filter(activity => activity.taskId === this.taskId)
    }
  },
  created() {
    this.loggedInUser = this.$store.getters.loggedinUser
  },
  components: {
    UpdateLog,
    ActivityLog,
    CloseIcon,
    HomeIcon,
  },
}
</script>
