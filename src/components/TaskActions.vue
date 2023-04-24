<template>
  <div class="task-actions-wrapper task-options sticky" :style="{ width: '40px' }">
    <div class="svg-wrapper">
      <span class="dots-icon" @click="() =>
        toggleTaskActions(!taskActionsOpen)" :class="{ active: taskActionsOpen }">
        <MenuIcon class="menu-icon icon" />
      </span>
    </div>
    <div class="task-actions" v-if="taskActionsOpen" v-clickOutside="toggleTaskActions">
      <section class="task-actions-list grid">
        <div v-for="action in actions" @click="() => emitFunction(action)"
          class="task-action flex align-center justify-start">
          <div class="icon-wrapper">
            <component :is="action.icon" :class="`icon ${action.icon}-icon flex align-center justify-center`"
              :style="{ fill: '#676879' }"></component>
          </div>
          <p>{{ action.title }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import AddIcon from '../assets/icons/Add.svg'
import DuplicateIcon from '../assets/icons/Duplicate.svg'
import TrashIcon from '../assets/icons/Delete.svg'
import MenuIcon from '../assets/icons/Menu.svg'

export default {
  name: 'actions',
  props: {
    taskId: String,
    groupColor: String,
  },
  data() {
    return {
      taskActionsOpen: false,
      taskActions: [
        {
          title: 'Create new task below',
          icon: 'AddIcon',
          emit: 'add',
        },
        {
          title: 'Delete',
          icon: 'TrashIcon',
          emit: 'remove',
        },
        {
          title: 'Duplicate',
          icon: 'DuplicateIcon',
          emit: 'copy',
        },
      ],
    }
  },
  computed: {
    actions() {
      return this.taskActions
    },
  },
  methods: {
    emitFunction(action) {
      return this.$emit(action.emit, this.taskId)
    },
    toggleTaskActions(value = false) {
      this.taskActionsOpen = value
    },
  },
  components: {
    AddIcon,
    DuplicateIcon,
    TrashIcon,
    MenuIcon
  },
}
</script>
