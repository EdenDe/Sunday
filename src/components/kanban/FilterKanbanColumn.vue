<template>
  <section class="kanban-column">
    <div class="filter-title flex justify-between align-start">
      <h4 class="select-title">Kanban Column</h4>
      <div class="icon-wrapper">
        <InfoIcon class="icon icon-info" />
      </div>
    </div>
    <div class="kanban-filter-select">
      <div class="filter-select-input" @click="toggleOptions">
        <div class="column-filter-title">
          <div class="icon-wrapper flex align-center">
            <StatusIcon class="icon-status icon" />
          </div>
          <span>{{ columnFilter }}</span>
        </div>
        <div class="icon icon-arrow"><ArrowDown /></div>
      </div>
      <ul class="options-list" v-if="isOptionOpen">
        <li class="flex justify-between option" @mousedown="onSelect('Status')">
          <span> Status </span>
          <div class="icon-wrapper">
            <StatusIcon class="icon icon-status" />
          </div>
        </li>
        <li
          class="flex justify-between option"
          @mousedown="onSelect('Priority')"
        >
          <span> Priority </span>
          <div class="icon-wrapper">
            <StatusIcon class="icon icon-status" />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import ArrowDown from '../../assets/icons/ArrowDown.svg'
import InfoIcon from '../../assets/icons/Info.svg'
import StatusIcon from '../../assets/icons/StatusEmpty.svg'

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
    StatusIcon,
  },
}
</script>

<style></style>
