<template>
  <section class="group-preview-close">
    <Container class="group-labels">
      <Draggable
        v-for="(label, index) in labels"
        :key="label"
        class="group-label"
        :class="label"
        :groupColor="group.color"
      >
        <div
          v-if="index === 1"
          class="first-col-color"
          :style="{ backgroundColor: group.color }"
        ></div>
        <div
          v-if="index === 2"
          class="group-title"
          :style="{ backgroundColor: group.color }"
        ></div>

        {{ label }}
      </Draggable>
    </Container>

    <ProgressBar :tasks="group.tasks" :groupColor="group.color" />
  </section>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import ProgressBar from './ProgressBar.vue'

export default {
  name: 'GroupPreviewClose',
  props: { group: Object },
  components: {
    ProgressBar,
  },
}
</script>
