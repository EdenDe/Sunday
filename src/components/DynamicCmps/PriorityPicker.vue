<template>
  <section class="priority-picker">
    <VDropdown :distance="6">
      <div :style="{ backgroundColor: status.color }" class="priority" @click="toggleColorPicker">
        <span class="flex align-center">
          {{ status.title }}
          <CriticalIcon v-if="status.title === 'Critical'" />
        </span>
      </div>
      <template #popper v-if="isPickerOpen">
        <LabelPicker v-clickOutside="toggleColorPicker" class="priority-label-picker" :labels="priorityLabels"
          @setLabel="updateLabel">
        </LabelPicker>
      </template>
      <span class="peeling-span scale-up-tr"></span>
    </VDropdown>
  </section>
</template>

<script>
import LabelPicker from '../LabelPicker.vue'
import CriticalIcon from '@/assets/icons/Critical.svg'
export default {
  name: 'priority',
  props: {
    info: String,
  },
  data() {
    return {
      status: null,
      isPickerOpen: false,
    }
  },
  created() {
    this.setLabels()
  },
  watch: {
    info() {
      this.setLabels()
    },
  },
  methods: {
    toggleColorPicker() {
      this.isPickerOpen = !this.isPickerOpen
      console.log(this.isPickerOpen)
    },
    updateLabel(labelTitle) {
      this.toggleColorPicker()
      this.$emit('updateProp', 'priority', labelTitle)
    },
    setLabels() {
      let labels = this.$store.getters.priorityLabels
      this.status = labels.find((label) => label.title === this.info)

      if (!this.status) {
        this.status = labels[4]
      }
    },
  },
  computed: {
    priorityLabels() {
      return this.$store.getters.priorityLabels
    },
  },
  components: {
    LabelPicker,
    CriticalIcon
  },
}
</script>
