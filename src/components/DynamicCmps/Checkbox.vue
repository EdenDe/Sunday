<template>
  <div class="task-checkbox flex align-center justify-center">
    <input type="checkbox" @change="toggleActionBar" v-model="isChecked" />
  </div>
</template>

<script>
export default {
  name: 'TaskCheckbox',
  data() {
    return {
      isChecked: false,
    }
  },
  props: {
    info: null,
  },
  emits: ['toggleActionBar'],
  methods: {
    toggleActionBar() {
      this.$emit('toggleActionBar', this.isChecked)
    },
  },
}
</script>
