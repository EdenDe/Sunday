<template>
  <section class="group-actions-list grid">
    <div
      v-for="action in actions"
      class="group-action flex align-center justify-start"
      v-focus="action.focus"
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
          svg: 'collapseAction',
          focus: 'Header',
        },
        {
          title: 'Add group',
          svg: 'addAction',
          focus: 'Header',
        },
        {
          title: 'Duplicate this group',
          svg: 'duplicateAction',
          focus: 'Header',
        },
        {
          title: 'Rename group',
          svg: 'renameAction',
          focus: 'Header',
        },
        {
          title: 'Change group color',
          svg: 'ColorAction',
          focus: 'Header',
        },
        {
          title: 'Delete',
          svg: 'deleteAction',
          focus: 'Header',
        },
      ],
    }
  },
}
</script>
