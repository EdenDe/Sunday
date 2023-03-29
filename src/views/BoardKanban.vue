<template>
  <section class="kanban-layout">
    <section class="kanban grid grid-col">
      <div class="label-col" v-for="(label, index) in labels" :key="index">
        <div class="label-col-title" :style="{ backgroundColor: label.color }">
          <div v-if="index === labels.length - 1">Blank</div>
          {{ label.title }}
        </div>

        <KanbanCards :tasks="tasks" />
      </div>
    </section>
  </section>
</template>
<script>
// import { Container, Draggable } from 'vue3-smooth-dnd'
import KanbanCards from '../../src/components/kanabn/KanbanCards.vue'
export default {
  name: 'Kanban',
  methods: {},

  computed: {
    labels() {
      return this.$store.getters.currBoard.priorityLabels
    },
    tasks() {
      const groups = this.$store.getters.groups
      // return groups
      let tasks = groups.map((g) =>
        g.tasks.filter((t) => t.priority === 'Critical')
      )
      return tasks
      //return tasks
      // filter((t) => t.priority === label)
    },
  },
  components: {
    KanbanCards,
  },
}
</script>
