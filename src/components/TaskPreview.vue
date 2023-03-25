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
      @toggleTask="toggleTask"
    />
  </section>
  <!-- <TaskActionBar
    v-if="isActionBarOpen"
    @toggleActionBar="toggleActionBar"
    @toggleTask="toggleTask"
    @remove="remove"
  ></TaskActionBar> -->
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
      // if (this.isActionBarOpen && isActionBarOpen) return
      // this.isActionBarOpen = isActionBarOpen
    },
    // remove() {
    //   this.$emit('removeTask', this.task.id)
    // },
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
  },
}
</script>
