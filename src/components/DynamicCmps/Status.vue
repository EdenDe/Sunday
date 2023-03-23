<template>
  <div :style="{ backgroundColor: status.color }" class="status flex justify-center align-center"
    @click="toggleColorPicker">
    {{ status.taskTitle }}
    <div v-if="isPickerOpen" class="color-picker-container">
      <div v-for="status in statusList" :style="{ backgroundColor: status.color }">
        {{ status.taskTitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskStatus',
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
    let labels = this.$store.getters.statusLabels
    this.status = labels.find((label) => label.taskTitle === this.info)
    if (!this.status) {
      this.status = {
        taskTitle: '',
        color: '#c4c4c4',
      }
    }
  },
  methods: {
    toggleColorPicker() {
      this.isPickerOpen = !this.isPickerOpen
    },
  },
  computed: {
    statusList() {
      return this.$store.getters.statusLabels
    },
  },
}
</script>
