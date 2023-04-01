<template>
  <section class="kanban-filter flex">
    <h4 class="kanban-filter-title">Customize View</h4>

    <section class="kanban-column-wrapper">
      <KanbanColumn @changeLabel="(value) => $emit('changeLabel', value)" />
    </section>
    <section class="card-columns-wrapper">
      <CardColumns
        @setFilterCmp="(isChecked) => $emit('setFilterCmp', isChecked)"
      />
    </section>
  </section>
</template>
<script>
import CardColumns from './FilterCardColumns.vue'
import KanbanColumn from './FilterKanbanColumn.vue'

export default {
  name: 'KanbanFilter',
  emits: ['changeLabel'],
  data() {
    return {
      isFilterOpen: false,
    }
  },
  methods: {
    toggleFilter() {
      this.isFilterOpen = !this.isFilterOpen
    },
  },
  components: { CardColumns, KanbanColumn },
}
</script>
