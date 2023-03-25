<template>
  <div class="task-checkbox flex align-center justify-center">
    <input type="checkbox" @change="toggleCheckbox" v-model="isChecked" />
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
    info: Boolean,
  },
  emits: ['toggleCheckbox', 'updateProp'],
  created() {
    this.isChecked = this.info
  },
  watch: {
    info() {
      this.isChecked = this.info
    },
  },
  methods: {
    toggleCheckbox() {
      this.$emit('updateProp', 'checkbox', this.isChecked)
    },
  },
}
</script>
