<template>
  <section class="group-actions-list grid">
    <div
      v-for="action in actions"
      @click="emitFunction(action)"
      class="group-action flex align-center justify-start"
    >
      <div class="icon-wrapper">
        <component
          :is="action.icon"
          :class="`icon ${action.icon}-icon flex align-center justify-center`"
          :style="{
            fill:
              action.title === 'Change group color' ? groupColor : '#676879',
          }"
        ></component>
      </div>
      <p>{{ action.title }}</p>
    </div>
  </section>
</template>

<script>
import AddIcon from '../assets/icons/Add.svg'
import DuplicateIcon from '../assets/icons/Duplicate.svg'
import RenameIcon from '../assets/icons/Edit.svg'
import ColorIcon from '../assets/icons/Color.svg'
import TrashIcon from '../assets/icons/Delete.svg'
import CollapseIcon from '../assets/icons/CollapseRound.svg'

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
          icon: 'CollapseIcon',
          emit: 'Header',
        },
        {
          title: 'Add group',
          icon: 'AddIcon',
          emit: 'add',
        },
        {
          title: 'Duplicate this group',
          icon: 'DuplicateIcon',
          emit: 'copy',
        },
        {
          title: 'Rename group',
          icon: 'RenameIcon',
          emit: 'renameTitle',
        },
        {
          title: 'Change group color',
          icon: 'ColorIcon',
          emit: 'openColorPicker',
        },
        {
          title: 'Delete',
          icon: 'TrashIcon',
          emit: 'remove',
        },
      ],
    }
  },
  computed: {
    actions() {
      return this.groupActions
    },
  },
  methods: {
    emitFunction(action) {
      return this.$emit(action.emit)
    },
  },
  components: {
    AddIcon,
    DuplicateIcon,
    RenameIcon,
    ColorIcon,
    TrashIcon,
    CollapseIcon,
  },
}
</script>
