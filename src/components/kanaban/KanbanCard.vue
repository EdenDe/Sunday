<template>
  <section class="card-row grid" :class="cmp + '-row'">
    <div class="icon-wrapper">
      <component :is="cmp + 'Icon'" :class="`icon ${cmp}-icon`"></component>
    </div>
    <div class="cmp-name">
      {{ cmp }}
    </div>
    <component :is="cmp" :info="task[cmp]" :taskId="task.id" />
    <div class="pulse-bubble" v-if="cmp === 'taskTitle'" v-tooltip="'Add to conversation'">
      <RouterLink :to="`/board/${$route.params.boardId}/main-table/pulse/${task.id}`">
        <PulseIcon class="pulse-icon icon" v-if="taskUpdatesNum === 0" />
        <div class="pulse-icon-empty icon" v-else>
          <PulseEmptyIcon />
          <p>
            {{ taskUpdatesNum }}
          </p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script>
import checkbox from '../dynamicCmps/Checkbox.vue'
import date from '../dynamicCmps/DatePicker.vue'
import timeline from '../dynamicCmps/TimelinePicker.vue'
import person from '../dynamicCmps/PersonPicker.vue'
import priority from '../dynamicCmps/PriorityPicker.vue'
import status from '../dynamicCmps/StatusPicker.vue'
import file from '../dynamicCmps/FileUpload.vue'
import TaskTitle from '../dynamicCmps/TitleInput.vue'
import txt from '../dynamicCmps/TxtInput.vue'
//ICONS
import dateIcon from '@/assets/icons/Calendar.svg'
import timelineIcon from '@/assets/icons/Timeline.svg'
import statusIcon from '@/assets/icons/Status.svg'
import priorityIcon from '@/assets/icons/Priority.svg'
import personIcon from '@/assets/icons/PersonsWithBorder.svg'
import fileIcon from '@/assets/icons/Page.svg'
import PulseIcon from '@/assets/icons/Pulse.svg'
import PulseEmptyIcon from '@/assets/icons/PulseEmpty.svg'

export default {
  name: 'KanbanCard',
  props: {
    cmp: String,
    task: Object
  },
  data() {
    return {
      isActionBarOpen: false,
    }
  },
  methods: {

  },
  computed: {
    taskUpdatesNum() {
      return this.task.updates?.length || 0
    },
  },
  created() {

  },
  components: {
    checkbox,
    date,
    timeline,
    person,
    priority,
    status,
    file,
    TaskTitle,
    txt,
    dateIcon,
    timelineIcon,
    statusIcon,
    priorityIcon,
    personIcon,
    fileIcon,
    PulseIcon,
    PulseEmptyIcon,
  },
}
</script>

<style></style>