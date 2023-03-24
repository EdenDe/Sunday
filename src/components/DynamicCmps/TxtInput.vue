<template>
  <section class="task-txt">
    <span
      contenteditable
      @focusin="onFocusIn"
      @focusout="onType($event.target.innerText)"
      >{{ displayedTxt }}</span
    >
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
      isFocused: false,
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
      this.isFocused = false
    },
    onFocusIn() {
      this.isFocused = true
    },
    getShortTxt() {
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
