<template>
  <section class="kanban-column">
    <div class="filter-title">
      <h4 class="select-title">Kanban Column</h4>
      <div class="icon-wrapper">
        <InfoIcon class="icon icon-info" />
      </div>
    </div>
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
import InfoIcon from '../../assets/icons/Info.svg'
export default {
  name: 'FilterKanbanColumn',
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
  components: {
    ArrowDown,
    InfoIcon,
  },
}
</script>

<style></style>
