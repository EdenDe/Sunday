<template>
  <section class="group-title-container">
    <div class="group-title-wrapper flex align-center">
      <span
        class="btn-color"
        :style="{ backgroundColor: color }"
        @mousedown.prevent="toggleColorPicker(true)"
      ></span>
      <span
        contenteditable
        ref="groupTitle"
        class="group-title"
        @focusout="onChangeGroupProp('title', $event.target.innerText)"
        :style="{ color: color }"
      >
        {{ title }}
      </span>
      <span class="tasks-num flex align-items justify-start"
        >{{ tasksNumber }} Tasks</span
      >
    </div>
    <div v-if="isColorPickerOpen" class="color-picker-wrapper">
      <ColorPicker @changeColor="onChangeGroupProp" />
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
    isColorModalOpen: Boolean,
  },
  emits: ['updateProp', 'toggleFocusGroupTitle', 'toggleColorModal'],
  data() {
    return {
      isColorPickerOpen: false,
    }
  },

  watch: {
    isTitleFocused: {
      handler() {
        this.focusGroupName()
      },
      immediate: true,
    },
    isColorModalOpen: {
      handler() {
        console.log(this.isColorModalOpen)
        this.focusGroupName()
        this.isColorPickerOpen = this.isColorModalOpen
      },
      immediate: true,
    },
  },
  methods: {
    toggleColorPicker(value) {
      this.isColorPickerOpen = value
    },
    onChangeGroupProp(prop, value) {
      console.log(prop, value)
      this.$emit('updateProp', null, prop, value)
      if (prop === 'title' && value.trim().length === 0) {
        value = 'Enter Title'
      }
      this.closeEditor()
    },
    focusGroupName() {
      if (this.isTitleFocused) this.$refs.groupTitle.focus()
    },
    closeEditor() {
      this.$emit('toggleFocusGroupTitle', false)
      this.toggleColorPicker(false)
      this.$emit('toggleColorModal', false)
    },
  },
  components: {
    ColorPicker,
  },
}
</script>
