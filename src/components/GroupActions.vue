<template>
  <div class="group-actions-wrapper sticky" :style="{ width: '40px' }">
    <div class="svg-wrapper">
      <span class="dots-icon" @click="() => toggleGroupActions(!isGroupActionsOpen)"
        :class="isGroupActionsOpen ? 'active group-menu-active' : ''">
        <MenuIcon class="menu-icon icon" />
      </span>

      <div class="group-actions" v-if="isGroupActionsOpen" v-clickOutside="toggleGroupActions">
        <section class="group-actions-list grid">
          <div v-for="action in actions" @click="() => emitFunction(action)"
            class="group-action flex align-center justify-start">
            <div class="icon-wrapper">
              <component :is="action.icon" :class="`icon ${action.icon}-icon flex align-center justify-center`" :style="{
                fill: action.icon === 'ColorIcon' ? groupClr : ''

              }"></component>
            </div>
            <p>{{ action.title }}</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import AddIcon from '../assets/icons/Add.svg'
import DuplicateIcon from '../assets/icons/Duplicate.svg'
import RenameIcon from '../assets/icons/Edit.svg'
import ColorIcon from '../assets/icons/Circle.svg'
import TrashIcon from '../assets/icons/Delete.svg'
import CollapseIcon from '../assets/icons/CollapseRound.svg'
import MenuIcon from '../assets/icons/Menu.svg'

export default {
  name: 'actions',
  props: {
    taskId: String,
  },
  inject: [
    'toggleOpenList',
    'addGroup',
    'copyGroup',
    'renameTitle',
    'toggleColorModal',
    'removeGroup',
    'groupClr'
  ],
  data() {
    return {
      isGroupActionsOpen: false,
      groupActions: [
        {
          title: 'Collapse this group',
          icon: 'CollapseIcon',
          emit: this.toggleOpenList,
        },
        {
          title: 'Add group',
          icon: 'AddIcon',
          emit: this.addGroup,
        },
        {
          title: 'Duplicate this group',
          icon: 'DuplicateIcon',
          emit: this.copyGroup,
        },
        {
          title: 'Rename group',
          icon: 'RenameIcon',
          emit: this.renameTitle,
        },
        {
          title: 'Change group color',
          icon: 'ColorIcon',
          emit: this.toggleColorModal,
        },
        {
          title: 'Delete',
          icon: 'TrashIcon',
          emit: this.removeGroup,
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
      action.emit()
    },
    toggleGroupActions(value = false) {
      this.isGroupActionsOpen = value
    },
  },
  components: {
    AddIcon,
    DuplicateIcon,
    RenameIcon,
    ColorIcon,
    TrashIcon,
    CollapseIcon,
    MenuIcon,
  },
}
</script>
