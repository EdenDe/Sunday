<template>
  <section class="group-title-container">
    <div class="group-title-wrapper flex align-center" :style="{ color: groupClr, width: '323px' }">
      <span class="btn-color" :style="{ backgroundColor: groupClr }" @mousedown.prevent="toggleColorPicker">
      </span>
      <span contenteditable ref="groupTitle" class="group-title"
        @focusout="(event) => onChangeTitle(event.target.innerText)">
        {{ title }}
      </span>
      <span class="tasks-num flex align-items justify-start">{{ tasksNumber }} Tasks</span>
    </div>

  </section>
</template>

<script>
import ColorPicker from '../components/ColorPicker.vue'

export default {
  name: 'GroupTitle',
  props: {
    color: String,
    title: String,
    tasksNumber: Number,
    isTitleFocused: Boolean,
  },
  inject: ['toggleColorModal', 'updateProp', 'toggleFocusGroupTitle', 'groupClr'],
  watch: {
    isTitleFocused() {
      if (this.isTitleFocused) {
        this.$refs.groupTitle.focus()
        console.log('focus')
      } else {
        console.log('unfocus')
      }
    }
  },
  methods: {
    toggleColorPicker() {
      this.toggleColorModal()
    },
    onChangeTitle(value) {
      this.closeEditor()
      if (value === this.title) return
      this.updateProp(null, 'color', value)
      if (prop === 'title' && value.trim().length === 0) {
        value = 'Enter Title'
      }

    },
    closeEditor() {
      this.toggleFocusGroupTitle(false)

    },
  },
  components: {
    ColorPicker,
  },
}
</script>
