<template>
  <section class="task-title">
    <span
      contenteditable
      @focusin="onFocusIn"
      @focusout="onFocusout($event.target.innerText)"
      :style="{ fontSize: '14px' }"
    >
      {{ displayedTxt }}
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
      this.$emit('updateProp', 'taskTitle', txt)
      this.isFocused = false
    },
    onFocusIn() {
      this.isFocused = true
    },
    getShortTxt() {
      let shortTxt = this.txt.split('')
      if (shortTxt.length > 25) {
        shortTxt = shortTxt.splice(0, 25).join('')
        shortTxt += '...'
      } else {
        shortTxt = shortTxt.join('')
      }
      return shortTxt
    },
  },
  computed: {
    displayedTxt() {
      // return this.getShortTxt()
      return this.isFocused ? this.txt : this.getShortTxt()
    },
  },
}
</script>
