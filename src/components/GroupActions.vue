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
  name: 'GroupActions',
  data() {
    return {
      actions: [
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
    }
  },
  methods: {
    emitFunction(action) {
      this.$emit(action.emit)
    }
  }
}
</script>
