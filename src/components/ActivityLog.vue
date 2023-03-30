<template>
  <section class="activity-log grid">
    <article v-for="activity in activities" class="activity grid">
      <div class="activity-date">
        <div class="icon-time-wrapper">
          <TimeIcon class="icon icon-time" />
        </div>
        <div v-tooltip="dateFormatted(activity.createdAt).tooltip" class="flex">
          {{ dateFormatted(activity.createdAt).date }}
        </div>
      </div>
      <div class="activity-task">
        <div class="avatar-wrapper">
          <Avatar :person="activity.createdBy" />
        </div>
        <p>{{ activity.title }}</p>
      </div>
      <div class="separator"></div>
      <div class="icon-wrapper">
        <component :is="activity.prop + 'Icon'" :class="`icon ${activity.prop}-icon`"></component>
      </div>
      <div class="activity-prop-txt">
        {{ activity.prop === 'taskTitle' ? 'Title' : activity.prop }}
      </div>

      <div class="separator"></div>
      <div class="activity-values grid">
        <component :is="activity.prop" :info="activity.oldValue"> </component>
        <ArrowRight v-if="activity.newValue" class="icon icon-arrow-right"></ArrowRight>
        <component :is="activity.prop" :info="activity.newValue"> </component>
      </div>
    </article>
  </section>
</template>

<script>
import { utilService } from '../services/util.service'
import Avatar from './Avatar.vue'
import date from './dynamicCmps/DatePicker.vue'
import timeline from './dynamicCmps/TimelinePicker.vue'
import person from './dynamicCmps/PersonPicker.vue'
import priority from './dynamicCmps/PriorityPicker.vue'
import status from './dynamicCmps/StatusPicker.vue'
import file from './dynamicCmps/FileUpload.vue'
import TaskTitle from './dynamicCmps/TitleInput.vue'
import txt from './dynamicCmps/TxtInput.vue'
//ICONS
import TimeIcon from '../assets/icons/Time.svg'
import dateIcon from '../assets/icons/Calendar.svg'
import timelineIcon from '../assets/icons/Timeline.svg'
import statusIcon from '../assets/icons/Status.svg'
import priorityIcon from '../assets/icons/Priority.svg'
import personIcon from '../assets/icons/PersonsWithBorder.svg'
import fileIcon from '../assets/icons/Page.svg'
import plusIcon from '../assets/icons/Add.svg'
import TaskTitleIcon from '../assets/icons/Text.svg'
import txtIcon from '../assets/icons/Text.svg'
import updatesIcon from '../assets/icons/Text.svg'
import CreatedIcon from '../assets/icons/AddWithBorder.svg'
import DeletedIcon from '../assets/icons/Delete2.svg'
import ArrowRight from '../assets/icons/ArrowRight.svg'

export default {
  name: 'ActivityLog',
  props: { activities: Array },
  data() {
    return {}
  },
  methods: {},
  computed: {
    dateFormatted() {
      return (createdAt) => {
        let time = new Intl.DateTimeFormat('en-He', {
          timeStyle: 'short',
          hour12: true,
        }).format(createdAt)
        let date = new Intl.DateTimeFormat('en-He', {
          month: 'short',
          day: 'numeric',
        }).format(createdAt)
        const tooltip = date + ' at ' + time

        return {
          date: utilService.getRelativeTimeAndDay(createdAt),
          tooltip: tooltip,
        }
      }
    },
  },
  created() {
    console.log(this.activities)
  },
  components: {
    Avatar,
    date,
    person,
    priority,
    status,
    TaskTitle,
    timeline,
    file,
    txt,
    // icons
    TimeIcon,
    plusIcon,
    personIcon,
    statusIcon,
    priorityIcon,
    dateIcon,
    timelineIcon,
    txtIcon,
    TaskTitleIcon,
    fileIcon,
    CreatedIcon,
    DeletedIcon,
    ArrowRight
  },
}
</script>

<style></style>
