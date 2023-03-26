<template>
  <section class="task-action-bar-container grid grid-col">
    <div class="selected-tasks-num grid">{{ selectedTasksNum }}</div>
    <div class="selected-tasks-num-txt">Task Selected</div>
    <div class="btn btn-container grid" @click="$emit('copy')">
      <DuplicateIcon class="duplicate-icon icon" />
    </div>
    <div class="btn btn-container grid" @click="$emit('remove')">
      <RemoveIcon class="remove-icon icon" />
      <span>Delete</span>
    </div>
    <div class="btn btn-container grid">
      <span @click="$emit('closeActionBar')">
        <CloseIcon class="close-icon icon" />
      </span>
    </div>
  </section>
</template>

<script>
import RemoveIcon from '../assets/icons/Delete.svg'
import DuplicateIcon from '../assets/icons/Duplicate.svg'
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
