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
            <div v-if="index === labels.length - 1">Blank</div>
            {{ label.title }}
          </div>

          <KanbanCards :tasks="tasks(label.title)" />
        </Draggable>
      </Container>
    </div>
    <KanbanFilter @changeLabel="onChangeLabel" />
  </section>
</template>
<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import KanbanCards from '../../src/components/kanban/KanbanCards.vue'
import KanbanFilter from '../../src/components/kanban/KanbanFilter.vue'
export default {
  name: 'Kanban',
  data() {
    return {
      labelsOrder: [],
      currLabel: 'statusOrderKanban',
    }
  },
  created() {
    this.labelsOrder = JSON.parse(
      JSON.stringify(this.$store.getters.currBoard[this.currLabel])
    )
  },
  methods: {
    onDropColumn({ addedIndex, removedIndex }) {
      this.labelsOrder.splice(
        addedIndex,
        0,
        cmpOrder.splice(removedIndex, 1)[0]
      )
      this.$store.dispatch({
        type: 'updateCurrBoard',
        groupId: null,
        taskId: null,
        prop: this.currLabel,
        toUpdate: this.labelsOrder,
      })
    },
    onChangeLabel(value) {
      this.currLabel =
        value === 'Priority' ? 'priorityOrderKanban' : 'statusOrderKanban'
      this.labelsOrder = JSON.parse(
        JSON.stringify(this.$store.getters.currBoard[this.currLabel])
      )
    },
  },

  computed: {
    labels() {
      return this.labelsOrder
    },
    tasks() {
      return (currLabel) => {
        let taskPerLabel = {}
        const groups = this.$store.getters.groups
        groups.forEach((group) => {
          taskPerLabel = group.tasks.reduce((label, task) => {
            if (!label[task.status]) label[task.status] = []
            label[task.status].push(task)
            return label
          }, taskPerLabel)
        })
        return taskPerLabel[currLabel]
      }
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
