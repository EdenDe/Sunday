<template>
  <div :style="{ backgroundColor: status.color }" class="status flex justify-center align-center"
    @click="toggleColorPicker">
    {{ status.title }}

    <LabelPicker v-clickOutside="toggleColorPicker" v-if="isPickerOpen" :labels="statusList" @setLabel="setLabel">
    </LabelPicker>
  </div>
</template>

<script>
import LabelPicker from '../LabelPicker.vue'
export default {
  name: 'TaskStatus ',
  props: {
    info: String,
  },
  data() {
    return {
      status: null,
      isPickerOpen: false,
      labels: [],
    }
  },
  created() {
    this.setLabels()
  },
  watch: {
    info() {
      this.setLabels()
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
    setLabels() {
      let labels = this.$store.getters.statusLabels
      this.status = labels.find((label) => label.title === this.info)
      if (!this.status) {
        this.status = labels[5]
      }
    }
  },
  computed: {
    statusList() {
      return this.$store.getters.statusLabels
    },
  },
  components: {
    LabelPicker,
  },
}
</script>
