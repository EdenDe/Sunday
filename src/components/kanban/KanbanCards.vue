<template>
  <Container
    class="kanban-cards grid"
    @drop="onDropTask($event)"
    orientation="horizontal"
    :drop-placeholder="{
      className: 'drop-placeholder1',
      animationDuration: '200',
      showOnTop: true,
    }"
  >
    <Draggable
      v-for="(task, index) in tasks"
      :key="index"
      class="task-card grid"
      :class="task"
    >
      <h1>
        {{ task.id }}
        I'm a card
      </h1>
    </Draggable>
  </Container>
</template>
<script>
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
  name: 'KanbanCards',
  props: { tasks: Array },
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
  components: {
    Container,
    Draggable,
  },
}
</script>
