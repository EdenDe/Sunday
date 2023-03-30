<template>
  <section class="kanban-layout grid grid-col">
    <div class="kanban flex">
      <Container
        class="kanban-container"
        orientation="horizontal"
        @drop="onDropColumn($event)"
        :drop-placeholder="{
          className: 'drop-placeholder1',
          animationDuration: '200',
          showOnTop: true,
        }"
      >
        <Draggable
          class="label-col"
          v-for="(label, index) in labels"
          :key="index"
        >
          <div
            class="label-col-title"
            :style="{ backgroundColor: label.color }"
          >
            {{ label.title }}
          </div>

          <KanbanCards :tasks="tasks(label.title)" />
        </Draggable>
      </Container>
    </div>
    <KanbanFilter @changeLabels="onChangeLabel" />
  </section>
</template>
<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import KanbanCards from '../../src/components/kanaban/KanbanCards.vue'
import KanbanFilter from '../../src/components/kanaban/KanbanFilter.vue'
export default {
  name: 'Kanban',
  data() {
    return {
      labelsOrder: [],
    }
  },
  created() {
    this.labelsOrder = JSON.parse(
      JSON.stringify(this.$store.getters.currBoard.statusOrderKanban)
    )
  },
  methods: {
    onDropColumn({ addedIndex, removedIndex }) {
      this.labelsOrder.splice(
        addedIndex,
        0,
        cmpOrder.splice(removedIndex, 1)[0]
      )
      // this.$store.dispatch({
      //   type: 'updateCurrBoard',
      //   groupId: null,
      //   taskId: null,
      //   prop: 'cmpOrder',
      //   toUpdate: cmpOrder,
      // })
    },
    onChangeLabel(value) {
      if (value === 'Priority')
        this.labelsOrder = JSON.parse(
          JSON.stringify(this.$store.getters.currBoard.priorityOrderKanban)
        )
      else
        this.labelsOrder = JSON.parse(
          JSON.stringify(this.$store.getters.currBoard.statusOrderKanban)
        )
    },
  },

  computed: {
    labels() {
      return this.labelsOrder
    },
    tasks() {
      return (label) => {
        const groups = this.$store.getters.groups
      }
      // return groups
      // let tasks = groups.map((g) =>
      //   g.tasks.filter((t) => t.priority === 'Critical')
      // )
      // return tasks
      //return tasks
      // filter((t) => t.priority === label)
    },
  },
  components: {
    Container,
    Draggable,
    KanbanCards,
    KanbanFilter,
  },
}
</script>
