<template>
  <div class="task-checkbox flex align-center justify-center">
    <input type="checkbox" @change="toggleTask" v-model="isChecked" />
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
  emits: ['toggleTask', 'updateProp'],
  created() {
    this.isChecked = this.info
  },
  watch: {
    info() {
      this.isChecked = this.info
    },
  },
  methods: {
    toggleTask() {
      this.$emit('updateProp', 'checkbox', this.isChecked)
      this.$emit('toggleTask', this.isChecked)
    },
  },
}
</script>
