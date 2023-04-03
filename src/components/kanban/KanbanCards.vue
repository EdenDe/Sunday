<template>
  <Container class="kanban-cards grid" orientation="vertical" :drop-placeholder="{
    className: 'drop-placeholder1',
    animationDuration: '200',
    showOnTop: true,
  }">
    <component :is="dragCmp" class="task-card grid grid-col" v-for="(task, index) in tasks" :key="index">
      <KanbanCard v-for="(cmp, index) in cmpsToDisplay" :task="task" :cmp="cmp" :key="index" @updateProp="updateProp" />
    </component>
  </Container>
</template>
<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import KanbanCard from './KanbanCard.vue'

export default {
  name: 'KanbanCards',
  props: { tasks: Array, cmpsToDisplay: Array },
  emits: ['updateProp'],
  methods: {
    updateProp(groupId, taskId, prop, toUpdate) {
      this.$emit('updateProp', groupId, taskId, prop, toUpdate)
    },
  },
  computed: {
    dragCmp() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return 'div'
      } else {
        return 'Draggable'
      }
    },
  },
  components: {
    Container,
    Draggable,
    KanbanCard,
  },
}
</script>
