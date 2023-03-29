<template>
  <section class="task-pulse">
    <header class="grid">
      <button class="btn btn-close" @click="onBack">
        <CloseIcon class="close-icon icon" />
      </button>
      <div class="task-title-container">
        <span contenteditable class="task-title">
          {{ object.title }}
        </span>
      </div>
      <div class="tabs-wrapper flex align-center">
<<<<<<< HEAD:src/views/Pulse.vue
        <div class="btn-tab-wrapper" :class="{ 'active-tab': activeTab === 'updateLog' }">
          <button class="btn btn-tab" @click="activeTab = 'updateLog'" v-tooltip="'Updates / ' + object.updates?.length">
=======
        <div
          class="btn-tab-wrapper"
          :class="{ 'active-tab': activeTab === 'updateLog' }"
        >
          <button
            class="btn btn-tab"
            @click="activeTab = 'updateLog'"
            v-tooltip="'Updates / ' + task.updates?.length"
          >
>>>>>>> 0a92e4d1160b397df670c859f7589291e0f72963:src/views/TaskPulse.vue
            <div class="task-update-icon">
              <HomeIcon class="home-icon icon" />
            </div>
            Updates
          </button>
        </div>
        <div class="border"></div>
        <div
          class="btn-tab-wrapper"
          :class="{ 'active-tab': activeTab === 'activityLog' }"
          v-tooltip="'Activity Log'"
          @click="activeTab = 'activityLog'"
        >
          <button class="btn btn-tab">Activity Log</button>
        </div>
      </div>
    </header>
    <main class="content-wrapper">
<<<<<<< HEAD:src/views/Pulse.vue
      <UpdateLog v-if="activeTab === 'updateLog'" :loggedInUser="loggedInUser" :updates="object.updates"
        @editUpdates="update" />
      <ActivityLog v-if="activeTab === 'activityLog'" :activities="activities" />
=======
      <UpdateLog
        v-if="activeTab === 'updateLog'"
        :loggedInUser="loggedInUser"
        :updates="task.updates ? task.updates : []"
        :taskId="task.id ? task.id : ''"
        @updateTask="updateTask"
      />
      <ActivityLog
        v-if="activeTab === 'activityLog'"
        :activities="activities"
      />
>>>>>>> 0a92e4d1160b397df670c859f7589291e0f72963:src/views/TaskPulse.vue
    </main>

    <!-- <img src="https://cdn.monday.com/images/pulse-page-empty-state.svg" /> -->
  </section>
  <div class="screen" ></div>
</template>

<script>
import UpdateLog from '../components/UpdateLog.vue'
import ActivityLog from '../components/ActivityLog.vue'
import CloseIcon from '../assets/icons/CloseBig.svg'
import HomeIcon from '../assets/icons/Home.svg'
<<<<<<< HEAD:src/views/Pulse.vue
=======
import { userService } from '../services/user.service'

>>>>>>> 0a92e4d1160b397df670c859f7589291e0f72963:src/views/TaskPulse.vue
export default {
  data() {
    return {
      groupId: null,
      activeTab: 'updateLog',
      loggedInUser: null,
      typingUser: '',
    }
  },
  methods: {
    onBack() {
      this.$router.push(`/board/${this.$route.params.boardId}/main-table`)
    },
    update(prop, toUpdate) {
      this.$store.dispatch({
        type: 'updateCurrBoard',
        groupId: this.taskId ? this.groupId : null,
        taskId: this.taskId,
        prop,
        toUpdate,
      })
    },
  },
  computed: {
    taskId() {
      return this.$route.params.taskId || null
    },
    object() {
      if (this.taskId) {
        const groups = this.$store.getters.groups
        if (groups) {
          for (let i = 0; i < groups.length; i++) {
            let currTask = groups[i].tasks.find((t) => t.id === this.taskId)
            if (currTask) {
              this.groupId = groups[i].id
              debugger
              return {
                title: currTask.taskTitle,
                updates: currTask.updates || [],
              }
            }
          }
          this.onBack()
        }
      } else {
        let board = this.$store.getters.currBoard
        return {
          title: board.title,
          updates: board.updates || [],
        }
      }

    },
    activities() {
      let activities = this.$store.getters.activities
      if (!this.taskId) return activities
      return activities.filter((activity) => activity.taskId === this.taskId)
    },
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
