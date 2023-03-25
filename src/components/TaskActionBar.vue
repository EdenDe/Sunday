<template>
  <section class="task-action-bar-container grid grid-col">
    <div class="selected-tasks-num grid">{{ selectedTasksNum }}</div>
    <div class="selected-tasks-num-txt">Task Selected</div>
    <div class="btn btn-container grid">
      <span v-icon="'duplicate'"></span>
      <span>Duplicate</span>
    </div>
    <div class="btn btn-container grid" @click="$emit('remove')">
      <span v-icon="'Trash'"></span>
      <span>Delete</span>
    </div>
    <div class="btn btn-container grid">
      <span v-icon="'close'" @click="$emit('closeActionBar')"></span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TaskActionBar',
  props: { selectedTasksNum: Number },
  emits: ['remove', 'closeActionBar'],
  computed: {},
}
</script>
