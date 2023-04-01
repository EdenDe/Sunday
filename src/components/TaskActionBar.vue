<template>
  <section class="task-action-bar-container grid grid-col">
    <div class="selected-tasks-num grid">{{ selectedTasksNum }}</div>
    <div class="selected-tasks-num-txt">
      <p>Item<span v-if="selectedTasksNum > 1">s</span> Selected</p>
      <div class="selected-tasks-num-dots grid grid-col">
        <div class="dot" v-for="num in selectedTasksNum"></div>
      </div>
    </div>
    <div class="btn btn-container grid" @click="$emit('copy')">
      <div class="btn-icon">
        <DuplicateIcon class="duplicate-icon icon" />
      </div>
      <span class="btn-text">Duplicate</span>
    </div>
    <div class="btn btn-container grid" @click="$emit('remove')">
      <div class="btn-icon">
        <RemoveIcon class="remove-icon icon" />
      </div>
      <span class="btn-text">Delete</span>
    </div>
    <div class="btn btn-container grid">
      <span @click="$emit('closeActionBar')">
        <CloseIcon class="close-icon icon" />
      </span>
    </div>
  </section>
</template>

<script>
import RemoveIcon from '../assets/icons/Delete2.svg'
import DuplicateIcon from '../assets/icons/Duplicate2.svg'
import CloseIcon from '../assets/icons/Close.svg'
export default {
  name: 'TaskActionBar',
  props: { selectedTasksNum: Number },
  emits: ['remove', 'closeActionBar', 'copy'],
  components: {
    RemoveIcon,
    CloseIcon,
    DuplicateIcon,
  },
}
</script>
