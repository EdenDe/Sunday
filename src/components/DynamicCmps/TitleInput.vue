<template>
  <section class="task-title">
    <span
      contenteditable
      @focusout="onFocusout($event.target.innerText)"
      :style="{ fontSize: '14px' }"
    >
      {{ txt }}
    </span>
  </section>
</template>

<script>
export default {
  name: 'TaskTitle',
  props: {
    info: String,
    taskId: String,
  },
  emits: ['updateProp'],
  data() {
    return {
      txt: this.info,
    }
  },
  watch: {
    info() {
      this.txt = this.info
    },
  },
  methods: {
    onFocusout(txt) {
      this.txt = txt
      this.$emit('updateProp', 'taskTitle', txt)
    },
  },
}
</script>
