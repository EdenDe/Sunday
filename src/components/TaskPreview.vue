<template>
  <section
    class="task-preview grid"
    :class="{
      sticky: cmp.name === 'taskTitle' || cmp.name === 'checkbox',
    }"
    v-for="(cmp, idx) in cmpOrder"
    :key="idx"
  >
    <component
      :is="cmp.name"
      :info="task[cmp.name]"
      :taskId="task.id"
      @updateProp="updateProp"
      @toggleTask="toggleTask"
    />
    <div
      class="pulse-bubble"
      v-if="cmp.name === 'taskTitle'"
      v-tooltip="'Add to conversation'"
    >
      <RouterLink
        :to="`/board/${$route.params.boardId}/main-table/pulse/${task.id}`"
      >
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
import checkbox from './dynamicCmps/Checkbox.vue'
import date from './dynamicCmps/DatePicker.vue'
import timeline from './dynamicCmps/TimelinePicker.vue'
import person from './dynamicCmps/PersonPicker.vue'
import priority from './dynamicCmps/PriorityPicker.vue'
import status from './dynamicCmps/StatusPicker.vue'
import file from './dynamicCmps/FileUpload.vue'
import TaskTitle from './dynamicCmps/TitleInput.vue'
import txt from './dynamicCmps/TxtInput.vue'
//ICONS
import PulseIcon from '../assets/icons/Pulse.svg'
import PulseEmptyIcon from '../assets/icons/PulseEmpty.svg'

export default {
  name: 'TaskPreview',
  props: {
    task: Object,
  },
  emits: ['updateProp', 'toggleTask'],
  data() {
    return {
      isActionBarOpen: false,
    }
  },
  methods: {
    updateProp(prop, toUpdate) {
      this.$emit('updateProp', this.task.id, prop, toUpdate)
    },
    toggleTask(isChecked) {
      this.$emit('toggleTask', this.task.id, isChecked)
    },
  },
  computed: {
    cmpOrder() {
      return this.$store.getters.cmpOrder
    },
    taskUpdatesNum() {
      return this.task.updates?.length || 0
    },
  },
  components: {
    checkbox,
    date,
    person,
    priority,
    status,
    TaskTitle,
    timeline,
    file,
    txt,
    PulseIcon,
    PulseEmptyIcon,
  },
}
</script>
