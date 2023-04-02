<template>
  <section class="status-picker">
    <VDropdown :distance="6">
      <div
        :style="{ backgroundColor: status.color }"
        class="status"
        @click="toggleColorPicker"
      >
        <span>
          <ConfettiExplosion />
          {{ status.title }}
        </span>
      </div>
      <template #popper v-if="isPickerOpen">
        <LabelPicker
          v-clickOutside="toggleColorPicker"
          class="status-label-picker"
          :labels="statusList"
          @setLabel="setLabel"
        >
        </LabelPicker>
      </template>
      <span class="peeling-span scale-up-tr"></span>
    </VDropdown>
  </section>
</template>

<script>
import LabelPicker from '../LabelPicker.vue'
import ConfettiExplosion from 'vue-confetti-explosion'
export default {
  name: 'TaskStatus',
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
    },
  },
  methods: {
    toggleColorPicker() {
      this.isPickerOpen = !this.isPickerOpen
    },
    setLabel(labelTitle) {
      this.toggleColorPicker()
      this.$emit('updateProp', 'status', labelTitle)
    },
    setLabels() {
      let labels = this.$store.getters.statusLabels
      this.status = labels.find((label) => label.title === this.info)
      if (!this.status) {
        this.status = labels[5]
      }
    },
  },
  computed: {
    statusList() {
      return this.$store.getters.statusLabels
    },
  },
  components: {
    LabelPicker,
    ConfettiExplosion,
  },
}
</script>
