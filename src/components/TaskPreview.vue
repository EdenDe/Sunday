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
  </section>
  <TaskActionBar
    v-if="isActionBarOpen"
    @toggleActionBar="toggleActionBar"
    @remove="remove"
  ></TaskActionBar>
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
  },
  emits: ['updateProp'],
  data() {
    return {
      isActionBarOpen: false,
      selectedTasksNum: 0,
    }
  },
  methods: {
    updateProp(prop, toUpdate) {
      this.$emit('updateProp', this.task.id, prop, toUpdate)
    },
    toggleActionBar(isActionBarOpen) {
      // console.log(isActionBarOpen)
      // if (!isActionBarOpen) this.selectedTasksNum = 0
      // this.selectedTasksNum++
      // console.log(this.selectedTasksNum)
      if (this.isActionBarOpen && isActionBarOpen) return
      this.isActionBarOpen = isActionBarOpen
    },
    remove() {
      // console.log('remove', this.task.id)
      this.$emit('removeTask', this.task.id)
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
