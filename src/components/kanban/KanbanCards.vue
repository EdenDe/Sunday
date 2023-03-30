<template>
  <div v-for="(task, index) in tasks" :key="index" class="grid">
    <Container class="kanban-cards grid" @drop="onDropTask" orientation="vertical" :drop-placeholder="{
      className: 'drop-placeholder1',
      animationDuration: '200',
      showOnTop: true,
    }">
      <Draggable class="task-card">
        <KanbanCard v-for="cmp, index in cmpsToDisplay" :task="task" :cmp="cmp" :key="index" />
      </Draggable>
    </Container>
  </div>
</template>
<script>

import { Container, Draggable } from 'vue3-smooth-dnd'
import KanbanCard from './KanbanCard.vue'

export default {
  name: 'KanbanCards',
  props: { tasks: Array, cmpsToDisplay: Array },
  methods: {
    onDropTask({ addedIndex, removedIndex }) {
      console.log(addedIndex, removedIndex)
      // addedIndex -= 2
      // removedIndex -= 2
      // let cmpOrder = JSON.parse(JSON.stringify(this.$store.getters.cmpOrder))
      // cmpOrder.splice(addedIndex, 0, cmpOrder.splice(removedIndex, 1)[0])
      // this.$store.dispatch({
      //   type: 'updateCurrBoard',
      //   groupId: null,
      //   taskId: null,
      //   prop: 'cmpOrder',
      //   toUpdate: cmpOrder,
      // })
    },
  },
  created() {
    console.log(this.tasks)
  },
  components: {
    Container,
    Draggable,
    KanbanCard
  },
}
</script>
