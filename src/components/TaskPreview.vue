<template>
  <section
    class="task-preview grid"
    :class="{ sticky: cmp === 'taskTitle' || cmp === 'checkbox' }"
    v-for="(cmp, idx) in cmpOrder"
    :key="idx"
  >
    <component
      :is="cmp"
      :info="task[cmp]"
      :taskId="task.id"
      @updateProp="updateProp"
      @toggleActionBar="toggleActionBar"
    />
    <TaskActionBar v-if="isActionBarOpen"></TaskActionBar>
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
import TaskActionBar from './TaskActionBar.vue'

export default {
  name: 'TaskPreview',
  props: {
    task: Object,
    isActionBarOpen: false,
  },
  emits: ['updateProp'],
  methods: {
    updateProp(prop, toUpdate) {
      this.$emit('updateProp', this.task.id, prop, toUpdate)
    },
    toggleActionBar() {
      this.isActionBarOpen = !this.isActionBarOpen
    },
  },
  computed: {
    cmpOrder() {
      return this.$store.getters.cmpOrder
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
    TaskActionBar,
  },
}
</script>
