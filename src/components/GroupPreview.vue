<template>
  <section
    class="group-preview"
    :class="isListOpen ? 'list-open' : 'list-close'"
  >
    <GroupPreviewClose
      v-if="!isListOpen"
      :group="group"
      :isGroupActionsOpen="isGroupActionsOpen"
      @toggleOpenList="toggleOpenList"
      @toggleGroupActions="toggleGroupActions"
      :isTitleFocused="isTitleFocused"
      :isColorModalOpen="isColorModalOpen"
      @updateProp="updateProp"
      @toggleFocusGroupTitle="toggleFocusGroupTitle"
      @toggleColorModal="toggleColorModal"
    />
    <template v-if="isListOpen">
      <div class="grid-title">
        <div class="group-actions-wrapper sticky">
          <div class="svg-wrapper">
            <span
              class="dots-icon"
              @click="toggleGroupActions(!isGroupActionsOpen)"
              :class="isGroupActionsOpen ? 'active group-menu-active' : ''"
            >
              <MenuIcon class="menu-icon icon" />
            </span>

            <div
              class="group-actions"
              v-if="isGroupActionsOpen"
              v-clickOutside="toggleGroupActions"
            >
              <GroupActions
                :groupColor="group.color"
                @add="$emit('addGroup')"
                @copy="copyGroup"
                @renameTitle="toggleFocusGroupTitle"
                @openColorPicker="toggleColorModal"
                @toggleOpenList="toggleOpenList"
                @remove="$emit('removeGroup', group.id)"
              />
            </div>
          </div>
        </div>

        <div class="open-list" v-tooltip="'Collapse group'">
          <ArrowDownIcon
            class="open-list-icon icon"
            :style="{ fill: group.color }"
            @click="toggleOpenList"
          />
        </div>
        <GroupTitle
          :color="group.color"
          :title="group.title"
          :tasksNumber="tasksNumber"
          :isTitleFocused="isTitleFocused"
          :isColorModalOpen="isColorModalOpen"
          @updateProp="updateProp"
          @toggleFocusGroupTitle="toggleFocusGroupTitle"
          @toggleColorModal="toggleColorModal"
        />
      </div>

      <Container class="group-labels">
        <Draggable
          v-for="(label, index) in labels"
          :key="label"
          class="group-label"
          :class="label"
          :groupColor="group.color"
        >
          <div
            v-if="index === 1"
            class="first-col-color group-label"
            :style="{ backgroundColor: group.color }"
          ></div>
          <div v-if="index === 2" class="group-checkbox group-label">
            <Checkbox :info="groupCheckbox" @updateProp="toggleSelectGroup" />
          </div>
          <div class="draggable-label">{{ label }}</div>
        </Draggable>
      </Container>

      <TaskList
        v-if="isListOpen"
        :tasks="group.tasks"
        :groupBgColor="group.color"
        @updateProp="updateProp"
      />
      <div class="add-task-container">
        <div class="task-option"></div>
        <div
          class="first-col-color"
          :style="{ backgroundColor: group.color }"
        ></div>
        <Checkbox />

        <form
          @submit.prevent="onAddTask"
          class="add-task-input-container sticky"
        >
          <input
            placeholder="+ Add task"
            type="text"
            v-model="newTask.taskTitle"
          />
        </form>
      </div>
      <ProgressBar :tasks="group.tasks" :groupColor="group.color" />
    </template>
    <TaskActionBar
      v-if="isActionBarOpen"
      :selectedTasksNum="selectedTasksNum"
      @closeActionBar="closeActionBar"
      @remove="removeTasks"
      @copy="copySelectedTasks"
    ></TaskActionBar>
  </section>
</template>

<script>
import GroupTitle from './GroupTitle.vue'
import TaskList from './TaskList.vue'
import Checkbox from './dynamicCmps/Checkbox.vue'
import ProgressBar from './ProgressBar.vue'
import TaskActionBar from './TaskActionBar.vue'
import GroupActions from './GroupActions.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { utilService } from '../services/util.service'
import { boardService } from '../services/board.service'
import ColorPicker from '../components/ColorPicker.vue'
import GroupPreviewClose from './GroupPreviewClose.vue'
//ICONS
import ArrowDownIcon from '../assets/icons/ArrowRight.svg'
import MenuIcon from '../assets/icons/Menu.svg'
export default {
  name: 'GroupPreview',
  props: {
    group: Object,
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
        groupId: this.group.id,
        taskId,
        prop,
        toUpdate,
      })
    },
    // onOpenColorPicker() {
    //   this.$refs.groupTitle.focus()
    //   this.isColorModalOpen = !this.isColorModalOpen
    //   if (this.isColorModalOpen) this.focusGroupName()
    // },
    onAddTask() {
      let group = JSON.parse(JSON.stringify(this.group))
      group.tasks.push({ ...this.newTask })
      this.updateProp(null, 'tasks', group.tasks)

      this.newTask.id = 't' + utilService.makeId()
      this.newTask.taskTitle = ''
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
    toggleGroupActions(value = false) {
      this.isGroupActionsOpen = value
    },
    copyGroup() {
      let newGroup = JSON.parse(JSON.stringify(this.group))
      newGroup.id = 'g' + utilService.makeId()
      newGroup.tasks.forEach((task) => {
        task.id = 't' + utilService.makeId()
      })

      this.$emit('addGroup', newGroup)
    },
    toggleFocusGroupTitle(value = true) {
      this.isTitleFocused = value
    },
    toggleColorModal(value = true) {
      this.toggleFocusGroupTitle(value)
      this.isColorModalOpen = value
    },
  },
  computed: {
    labels() {
      let labels = [null, null, null]
      labels.push(
        ...this.$store.getters.cmpOrder.slice(1).map((cmp) => cmp.name)
      )

      return labels.map((label) => {
        if (label === 'taskTitle') label = 'task'
        if (label === 'txt') label = 'text'
        return label
      })
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
            title: `${title} ${
              res[title]
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
    TaskList,
    ProgressBar,
    Container,
    Draggable,
    Checkbox,
    TaskActionBar,
    GroupActions,
    ColorPicker,
    GroupPreviewClose,
    ArrowDownIcon,
    MenuIcon,
  },
}
</script>
