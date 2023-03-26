<template>
  <section class="group-actions-list grid">
    <div
      v-for="action in actions"
      class="group-action flex align-center justify-start"
    >
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
        },
        {
          title: 'Add group',
          svg: 'addAction',
        },
        {
          title: 'Duplicate this group',
          svg: 'duplicateAction',
        },
        {
          title: 'Rename group',
          svg: 'actionsRename',
        },
        {
          title: 'Change group color',
          svg: 'ColorAction',
        },
        {
          title: 'Delete',
          svg: 'actionsTrash',
        },
      ],
    }
  },
}
</script>
