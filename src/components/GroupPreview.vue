<template>
  <section class="group-preview" :class="isListOpen ? 'list-open' : 'list-close'">
    <ColorPicker v-if="isColorModalOpen" @changeColor="changeColor" />

    <GroupPreviewClose v-if="!isListOpen" :group="group" @toggleOpenList="toggleOpenList">
      <GroupTitle :title="group.title" :tasksNumber="tasksNumber" :isTitleFocused="isTitleFocused" />
    </GroupPreviewClose>

    <template v-if="isListOpen">
      <div class="grid-title">
        <GroupActions />
        <div :style="{ width: '33px' }" class="open-list" v-tooltip="'Collapse group'">
          <ArrowDownIcon class="open-list-icon icon" :style="{ fill: group.color }" @click="toggleOpenList" />
        </div>
        <GroupTitle :title="group.title" :tasksNumber="tasksNumber" :isTitleFocused="isTitleFocused" />
      </div>
      <GroupLabels :groupCheckbox="groupCheckbox" @toggleSelectGroup="toggleSelectGroup" />
      <TaskList v-if="isListOpen" :tasks="group.tasks" :groupBgColor="group.color" @updateProp="updateProp" />
      <AddTask :groupClr="group.color" @addTask="addTask" />
      <ProgressBar :tasks="group.tasks" :groupColor="group.color" />
    </template>
    <TaskActionBar v-if="isActionBarOpen" :selectedTasksNum="selectedTasksNum" @closeActionBar="closeActionBar"
      @remove="removeTasks" @copy="copySelectedTasks"></TaskActionBar>
  </section>
</template>

<script>
import { computed } from 'vue'
import { utilService } from '../services/util.service'
import { boardService } from '../services/board.service'

import GroupTitle from './GroupTitle.vue'
import AddTask from './AddTask.vue'
import TaskList from './TaskList.vue'
import ProgressBar from './ProgressBar.vue'
import TaskActionBar from './TaskActionBar.vue'
import GroupActions from './GroupActions.vue'
import ColorPicker from '../components/ColorPicker.vue'
import GroupPreviewClose from './GroupPreviewClose.vue'
import GroupLabels from './GroupLabels.vue'

//ICONS
import ArrowDownIcon from '../assets/icons/ArrowRight.svg'

export default {
  name: 'GroupPreview',
  props: {
    group: Object,
  },
  provide() {
    return {
      updateProp: this.updateProp,
      removeGroup: () => this.$emit('removeGroup', this.group.id),
      renameTitle: this.toggleFocusGroupTitle,
      addGroup: () => this.$emit('addGroup'),
      copyGroup: this.copyGroup,
      toggleOpenList: this.toggleOpenList,
      toggleColorModal: this.toggleColorModal,
      toggleFocusGroupTitle: this.toggleFocusGroupTitle,
      groupClr: computed(() => this.group.color)
    }
  },
  data() {
    return {
      isActionBarOpen: false,
      selectedTasks: [],
      newTask: boardService.getEmptyTask(),
      groupCheckbox: false,
      isListOpen: true,
      isColorModalOpen: false,
      isGroupActionsOpen: false,
      isTitleFocused: false,
    }
  },
  methods: {
    updateProp(taskId, prop, toUpdate) {
      console.log(taskId, prop, toUpdate)
      this.$store.dispatch({
        type: 'updateCurrBoard',
        groupId: prop === 'cmpOrder' ? null : this.group.id,
        taskId,
        prop,
        toUpdate,
      })
    },
    changeColor(color) {
      this.toggleFocusGroupTitle(false)
      if (color === this.group.color) return
      this.updateProp(null, 'color', color)
    },
    addTask(taskTitle) {
      this.newTask.taskTitle = taskTitle
      let group = JSON.parse(JSON.stringify(this.group))
      group.tasks.push({ ...this.newTask })
      this.updateProp(null, 'tasks', group.tasks)
      this.newTask.id = 't' + utilService.makeId()

    },
    removeTasks() {
      this.group.tasks = this.group.tasks.filter(
        (t) => !this.selectedTasks.includes(t.id)
      )
      this.updateProp(null, 'tasks', this.group.tasks)
    },
    toggleSelectGroup(prop, value) {
      this.group.tasks.forEach((task) => this.updateProp(task.id, prop, value))
    },
    toggleOpenList() {
      this.isListOpen = !this.isListOpen
    },
    copySelectedTasks() {
      const tasks = []
      this.group.tasks.forEach((task) => {
        if (this.selectedTasks.includes(task.id)) {
          let newTask = { ...task }
          newTask.id = utilService.makeId()
          newTask.taskTitle += ' copy'
          tasks.push(newTask)
        }
      })

      this.group.tasks.push(...tasks)
      this.updateProp(null, 'tasks', this.group.tasks)
      this.closeActionBar()
    },
    closeActionBar() {
      this.toggleSelectGroup('checkbox', false)
    },

    copyGroup() {
      let newGroup = JSON.parse(JSON.stringify(this.group))
      newGroup.id = 'g' + utilService.makeId()
      newGroup.tasks.forEach((task) => {
        task.id = 't' + utilService.makeId()
      })

      this.$emit('addGroup', newGroup)
    },
    toggleColorModal(value = !this.isColorModalOpen) {
      this.toggleFocusGroupTitle(value)
      this.isColorModalOpen = value
    },
    toggleFocusGroupTitle(value = true) {
      console.log('change focus', value)
      this.isTitleFocused = value
      if (!value) this.isColorModalOpen = value
    },
  },
  computed: {
    titleCmp() {
      return `<GroupTitle :title="${this.group.title}" :tasksNumber="${this.tasksNumber}" :isTitleFocused="${this.isTitleFocused}" />`
    },
    groupTitle() {
      return this.group.title || 'Enter Title'
    },
    groupStatusProgress() {
      let res = this.group.tasks.reduce((obj, { status }) => {
        if (!obj[status]) obj[status] = 0
        obj[status] += 1
        return obj
      }, {})

      let statusLabel = this.$store.getters.statusLabels
      let totalTaskLength = this.group.tasks.length

      statusLabel.map(({ title, color }) => {
        if (res[title]) {
          let presentageWidth = (res[title] / totalTaskLength) * 100

          res[title] = {
            width: Math.round(presentageWidth) + '%',
            color: color,
            title: `${title} ${res[title]
              }/${totalTaskLength} ${presentageWidth.toFixed(1)}%`,
          }
        }
      })

      return res
    },
    selectedTasksNum() {
      return this.selectedTasks.length
    },
    tasksNumber() {
      if (this.group.tasks?.length) return this.group.tasks.length
      else return 'No '
    },

  },
  watch: {
    group: {
      handler() {
        this.selectedTasks = this.group.tasks
          .filter((t) => t.checkbox)
          .map((t) => t.id)
        if (!this.selectedTasks.length) {
          this.isActionBarOpen = false
          this.groupCheckbox = false
        } else {
          this.isActionBarOpen = true
          this.groupCheckbox =
            this.group.tasks.length === this.selectedTasks.length
        }
      },
      immediate: true,
      deep: true,
    },
  },
  components: {
    GroupTitle,
    AddTask,
    TaskList,
    ProgressBar,
    TaskActionBar,
    GroupActions,
    ColorPicker,
    GroupPreviewClose,
    ArrowDownIcon,
    GroupLabels
  },
}
</script>
