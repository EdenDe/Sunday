<template>
  <section class="kanban-filter flex">
    <h4 class="kanban-filter-title">Customize View</h4>
    <h4 class="select-title">Kanban Column</h4>
    <div class="kanban-filter-select">
      <div class="filter-select-input" @click="toggleOptions">
        <span>{{ columnFilter }}</span>
        <div class="icon"><ArrowDown /></div>
      </div>
      <ul class="options-list" v-if="isOptionOpen">
        <li class="flex option" @mousedown="onSelect('Status')">Status</li>
        <li class="flex option" @mousedown="onSelect('Priority')">Priority</li>
      </ul>
    </div>
  </section>
</template>
<script>
import ArrowDown from '../../assets/icons/ArrowDown.svg'
export default {
  name: 'KanbanFilter',
  emits: ['changeLabel'],
  data() {
    return {
      columnFilter: 'Status',
      isOptionOpen: false,
    }
  },
  methods: {
    onSelect(value) {
      this.columnFilter = value
      this.toggleOptions()
      this.$emit('changeLabel', value)
    },
    toggleOptions() {
      this.isOptionOpen = !this.isOptionOpen
    },
  },

  components: { ArrowDown },
}
</script>
