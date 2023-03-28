<template>
  <section class="group-title-container">
    <div class="group-title-wrapper flex align-center">
      <span
        class="btn-color"
        :style="{ backgroundColor: color }"
        @mousedown.prevent="onOpenColorPicker"
      ></span>
      <span
        contenteditable
        ref="groupTitle"
        class="group-title"
        @focusout="onChangeGroupProp('title', $event.target.innerHTML)"
        :style="{ color: color }"
      >
        {{ title }}
      </span>
      <span class="tasks-num flex align-items justify-start"
        >{{ tasksNumber }} Tasks</span
      >
    </div>
    <div v-if="isColorModalOpen" class="color-picker-wrapper">
      <ColorPicker @changeColor="onChangeGroupProp" />
    </div>
  </section>
</template>

<script>
import ColorPicker from '../components/ColorPicker.vue'

export default {
  name: 'GroupTitle',
  props: { color: String, title: String, tasksNumber: Number },
  data() {
    return {
      isColorModalOpen: false,
    }
  },
  methods: {
    onOpenColorPicker() {
      this.isColorModalOpen = !this.isColorModalOpen
    },
    onChangeGroupProp(prop, value) {
      this.$emit('updateProp', null, prop, value)
      console.log(prop, value)
      if (prop === 'color') this.onOpenColorPicker()
      if (prop === 'title' && value.trim().length === 0) {
        value = 'Enter Title'
      }
    },
    // changeGroupProp(prop, toUpdate) {
    //   console.log(prop, toUpdate)
    //   this.$emit('changeGroupProp', prop, toUpdate)
    // },
  },
  components: {
    ColorPicker,
  },
}
</script>
