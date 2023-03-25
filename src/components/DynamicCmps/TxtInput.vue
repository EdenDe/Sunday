<template>
  <section class="task-txt">
    <span
      contenteditable
      @focusin="onFocusIn"
      @focusout="onFocusout($event.target.innerText)"
      :style="{ fontSize: '14px' }"
      >{{ displayedTxt }}</span
    >
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
    getShortTxt() {
      if (!this.txt) return
      let shortTxt = this.txt.split('')
      if (shortTxt.length > 33) {
        shortTxt = shortTxt.splice(0, 33).join('')
        shortTxt += '...'
      } else {
        shortTxt = shortTxt.join('')
      }
      return shortTxt
    },
  },
  computed: {
    displayedTxt() {
      return this.isFocused ? this.txt : this.getShortTxt()
    },
  },
}
</script>
