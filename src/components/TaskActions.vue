<template>
  <section class="task-actions-list grid">
    <div
      v-for="action in actions"
      @click="emitFunction(action)"
      class="task-action flex align-center justify-start"
    >
      <div class="icon-wrapper">
        <component
          :is="action.icon"
          :class="`icon ${action.icon}-icon flex align-center justify-center`"
          :style="{ fill: '#676879' }"
        ></component>
      </div>
      <p>{{ action.title }}</p>
    </div>
  </section>
</template>

<script>
import AddIcon from '../assets/icons/Add.svg'
import DuplicateIcon from '../assets/icons/Duplicate.svg'
import TrashIcon from '../assets/icons/Delete.svg'

export default {
  name: 'actions',
  props: {
    taskId: String,
    groupColor: String,
  },
  data() {
    return {
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
  },
  components: {
    AddIcon,
    DuplicateIcon,
    TrashIcon,
  },
}
</script>
