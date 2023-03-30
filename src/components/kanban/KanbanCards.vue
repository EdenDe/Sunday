<template>
  <Container class="kanban-cards grid" @drop="onDropTask" orientation="horizontal" :drop-placeholder="{
    className: 'drop-placeholder1',
    animationDuration: '200',
    showOnTop: true,
  }">
    <Draggable v-for="(task, index) in tasks" :key="index" class="task-card" :class="task">
      <KanbanCard v-for="cmp, index in cmpsToDisplay" :task="task" :cmp="cmp" :key="index" />
    </Draggable>
  </Container>
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
<<<<<<< HEAD:src/components/kanaban/KanbanCards.vue
  created() {
    console.log(this.cmpsToDisplay)
  },
=======
>>>>>>> d0677cd5898f1a1b86ee04ec4da4bb012f1add26:src/components/kanban/KanbanCards.vue
  components: {
    Container,
    Draggable,
    KanbanCard
  },
}
</script>
