<template>
  <section class="activity-log grid">
    <article v-for="activity in activities" class="activity grid">
      <div>
        <i></i>
        <div v-tooltip="dateFormatted(activity.createdAt).tooltip">
          {{ dateFormatted(activity.createdAt).date }}
        </div>
      </div>
      <Avatar :person="activity.createdBy" />
      <p>{{ activity.title }}</p>
      <div class="separator"></div>
      <component :is="activity.prop"></component>
      <div>{{ activity.prop }}</div>
      <div class="separator"></div>
      <div class="activity-values grid">
        <component :is="activity.prop" :info="activity.oldValue"> </component>
        <div class="arrow">></div>
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
import CalendarIcon from '../assets/icons/Calendar.svg'
import StatusIcon from '../assets/icons/Status.svg'
import PersonIcon from '../assets/icons/Person.svg'
import PlusIcon from '../assets/icons/Add.svg'
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
    StatusIcon,
    PersonIcon,
    PlusIcon,
    CalendarIcon,
  },
}
</script>

<style></style>
