<template>
  <section class="task-title grid">
    <span contenteditable @input="onType($event.target.innerHTML)">{{ txt }}</span>
  </section>
</template>

<script>

export default {
  name: 'TaskTitle',
  props: {
    info: String,
  },
  data() {
    return {
      txt: this.info
    }
  },
  methods: {
    onType(txt) {
      this.$emit('updateProp', 'taskTitle', txt)
    }
  },
  emits: ['updateProp']


}
</script>
