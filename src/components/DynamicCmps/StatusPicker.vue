<template>
  <section class="status-picker">
    <VDropdown :distance="6">
      <div :style="{ backgroundColor: status.color }" class="status" @click="toggleColorPicker">
        <canvas ref="labelStatus" :style="{ height: '36px', width: '127px' }"></canvas>
        <span>
          {{ status.title }}
          <!-- <Confetti :confetti-settings="settings" /> -->
        </span>
      </div>
      <template #popper v-if="isPickerOpen">
        <LabelPicker v-clickOutside="toggleColorPicker" class="status-label-picker" :labels="statusList"
          @setLabel="setLabel">
        </LabelPicker>
      </template>
      <span class="peeling-span scale-up-tr"></span>
    </VDropdown>
  </section>
</template>

<script>
import LabelPicker from '../LabelPicker.vue'

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
      settings: {
        target: this.$refs.labelStatus,
        max: 50,
        size: 1,
        animate: true,
        props: ['circle', 'square'],
        colors: [
          [165, 104, 246],
          [230, 61, 135],
          [0, 199, 228],
          [253, 214, 126]
        ],
        origin: {
          x: 0.5,
          y: 0.5,
          element: this.$refs.labelStatus
        }
      }
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
      if (labelTitle === 'Done') this.throwConfetti()
      this.$emit('updateProp', 'status', labelTitle)
    },
    setLabels() {
      let labels = this.$store.getters.statusLabels
      this.status = labels.find((label) => label.title === this.info)
      if (!this.status) {
        this.status = labels[5]
      }
    },
    throwConfetti() {
      this.$confetti.start({ canvasElement: this.$refs.labelStatus });
      setTimeout(() => {
        this.$confetti.stop()
      }, 3000)
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
