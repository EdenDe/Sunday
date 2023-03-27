<template>
  <section class="group-title-container">
    <div class="group-title-wrapper flex align-center">
      <button
        class="btn-color"
        :style="{ backgroundColor: color }"
        @click.prevent="onOpenColorPicker"
      ></button>
      <span
        contenteditable
        ref="groupTitle"
        class="group-title"
        @focusout="changeGroupProp('title', $event.target.innerHTML)"
        :style="{ color: color }"
      >
        {{ title }}
      </span>
      <span class="tasks-num flex align-items justify-start"
        >{{ tasksNumber }} Tasks</span
      >
    </div>
    <div v-if="isColorModalOpen" class="color-picker-wrapper">
      <ColorPicker @changeColor="changeGroupProp" />
    </div>
  </section>
</template>

<script>
import ColorPicker from '../components/ColorPicker.vue'
//ICONS
import ArrowDownIcon from '../assets/icons/ArrowRight.svg'

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
    // changeGroupProp(color) {
    //   this.$emit('changeGroupProp', color)
    // },
    changeGroupProp(prop, toUpdate) {
      console.log(prop, toUpdate)
      this.$emit('changeGroupProp', prop, toUpdate)
    },
  },
  components: {
    ArrowDownIcon,
    ColorPicker,
  },
}
</script>
