<template>
  <section class="task-txt">
    <span contenteditable @focusout="onType($event.target.innerText)">{{
      txt
    }}</span>
  </section>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    info: String,
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
    onType(txt) {
      this.txt = txt
      this.$emit('updateProp', 'text', txt)
    },
  },
}
</script>
