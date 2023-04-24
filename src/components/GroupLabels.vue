<template>
  <Container class="group-labels" @drop="onDropColumn" orientation="horizontal">
    <component :is="dragCmp" v-for="(label, index) in labels" :key="index" class="group-label" :class="label"
      :style="{ width: label.width, height: '36px' }">
      <div class="draggable-label">
        {{ label.name }}
      </div>
      <div v-if="index === 1" class="first-col-color group-label" :style="{ backgroundColor: groupClr, width: '6px' }">
      </div>
      <div v-if="index === 2" class="group-checkbox group-label">
        <Checkbox :info="groupCheckbox" @updateProp="toggleSelectGroup" />
      </div>
    </component>
  </Container>
</template>

<script>
import Checkbox from './dynamicCmps/Checkbox.vue';
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
  name: 'GroupLabel',
  inject: ['updateProp', 'groupClr'],
  props: {
    groupCheckbox: Boolean,
  },
  methods: {
    toggleSelectGroup(prop, value) {
      this.$emit('toggleSelectGroup', prop, value)
    },
    onDropColumn({ addedIndex, removedIndex }) {
      document.activeElement.blur()
      addedIndex -= 2
      removedIndex -= 2
      let cmpOrder = JSON.parse(JSON.stringify(this.$store.getters.cmpOrder))
      cmpOrder.splice(addedIndex, 0, cmpOrder.splice(removedIndex, 1)[0])
      updateProp(null, 'cmpOrder', cmpOrder)
    }
  },
  computed: {
    dragCmp() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return 'div'
      } else {
        return 'Draggable'
      }
    },
    labels() {
      let labels = [
        { name: '', width: '40px' },
        { name: '', width: '6px' },
        { name: '', width: '33px' },
      ]
      const cmpOrder = JSON.parse(JSON.stringify(this.$store.getters.cmpOrder))
      labels.push(...cmpOrder.slice(1).map((cmp) => cmp))

      return labels.map((label) => {
        if (label.name === 'taskTitle') label.name = 'task'
        if (label.name === 'txt') label.name = 'text'
        return label
      })
    },
  },
  components: {
    Checkbox,
    Container,
    Draggable
  },
}
</script>

