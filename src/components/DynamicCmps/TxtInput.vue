<template>
  <section class="task-txt">
<<<<<<< HEAD
    <span
      contenteditable
      @focusin="onFocusIn"
      @focusout="onFocusout($event.target.innerText)"
      :style="{ fontSize: '14px' }"
      >{{ txt }}</span
    >
=======
    <span contenteditable @focusin="onFocusIn" @focusout="onFocusout($event.target.innerText)"
      :style="{ fontSize: '14px' }">{{ txt }}</span>
>>>>>>> a24eaed20f29e8e9a45a648cedf4f5600f0de34f
  </section>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    info: String || null,
  },
  emits: ['updateProp'],
  data() {
    return {
      txt: this.info,
      isFocused: false,
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
      this.$emit('updateProp', 'text', txt)
      this.isFocused = false
    },
    onFocusIn() {
      this.isFocused = true
    },
  },
}
</script>
