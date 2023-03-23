<template>
  <div
    :style="{ backgroundColor: status.color }"
    class="priority flex justify-center align-center"
    @click="toggleColorPicker"
  >
    {{ status.taskTitle }}
    <LabelPicker
      v-if="isPickerOpen"
      :labels="priorityLabels"
      @setLabel="setLabel"
    ></LabelPicker>
  </div>
</template>

<script>
import LabelPicker from '../LabelPicker.vue'
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
    let labels = this.$store.getters.priorityLabels
    this.status = labels.find((label) => label.taskTitle === this.info)
    if (!this.status) {
      this.status = labels[4]
    }
  },
  methods: {
    toggleColorPicker() {
      this.isPickerOpen = !this.isPickerOpen
    },
    setLabel(labelTitle) {
      this.toggleColorPicker
      this.$emit('updateProp', 'status', labelTitle)
    },
  },
  computed: {
    priorityLabels() {
      return this.$store.getters.priorityLabels
    },
  },
  components: {
    LabelPicker,
  },
}
</script>
