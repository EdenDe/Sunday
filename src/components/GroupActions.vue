<template>
  <section class="group-actions-list grid">
    <div v-for="action in actions" @click="emitFunction(action)" class="group-action flex align-center justify-start">
      <div class="svg-wrapper">
        <i v-icon="action.svg"></i>
      </div>
      <p>{{ action.title }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'actions',
  props: {
    taskId: String,
    groupColor: String,
  },
  data() {
    return {
      groupActions: [
        {
          title: 'Collapse this group',
          svg: 'actionsCollapse',
          emit: 'Header',
        },
        {
          title: 'Add group',
          svg: 'addAction',
          emit: 'add',
        },
        {
          title: 'Duplicate this group',
          svg: 'duplicateAction',
          emit: 'copy',
        },
        {
          title: 'Rename group',
          svg: 'actionsRename',
          emit: 'renameTitle',
        },
        {
          title: 'Change group color',
          svg: 'ColorAction',
          emit: 'openColorPicker',
        },
        {
          title: 'Delete',
          svg: 'actionsTrash',
          emit: 'remove',
        },
      ],
      taskActions: [
        {
          title: 'Create new task below',
          svg: '',
          emit: 'add',
        },
        {
          title: 'Delete',
          svg: '',
          emit: 'remove',
        },
        {
          title: 'Duplicate',
          svg: '',
          emit: 'copy',
        },
      ],
    }
  },
  computed: {
    actions() {
      if (this.taskId) return this.taskActions
      return this.groupActions
    },
  },
  methods: {
    emitFunction(action) {
      if (this.taskId) return this.$emit(action.emit, this.taskId)
      return this.$emit(action.emit)
    }
  }
}
</script>
