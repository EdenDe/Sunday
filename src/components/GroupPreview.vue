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
      @updateProp="updateProp"
      @copyGroup="copyGroup"
    />
    <template v-if="isListOpen">
      <div class="grid-title">
        <div class="group-actions-wrapper sticky" :style="{ width: '40px' }">
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
                @copyGroup="copyGroup"
                @renameTitle="toggleFocusGroupTitle"
                @openColorPicker="toggleColorModal"
                @toggleOpenList="toggleOpenList"
                @remove="$emit('removeGroup', group.id)"
              />
            </div>
          </div>
        </div>

        <div
          :style="{ width: '33px' }"
          class="open-list"
          v-tooltip="'Collapse group'"
        >
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

      <Container
        class="group-labels"
        @drop="onDropColumn"
        orientation="horizontal"
        :drop-placeholder="{
          className: 'drop-placeholder1',
          animationDuration: '200',
          showOnTop: true,
        }"
      >
        <Draggable
          v-for="(label, index) in labels"
          :key="index"
          class="group-label"
          :class="label"
          :groupColor="group.color"
          :style="{ width: label.width }"
          draggable="false"
        >
          <div class="draggable-label">
            {{ label.name }}
          </div>
          <div
            v-if="index === 1"
            class="first-col-color group-label"
            :style="{ backgroundColor: group.color, width: '6px' }"
          ></div>
          <div v-if="index === 2" class="group-checkbox group-label">
            <Checkbox :info="groupCheckbox" @updateProp="toggleSelectGroup" />
          </div>
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
            @focusout="onAddTask"
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
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true,
      },
      isTitleFocused: false,
    }
  },
  methods: {
    onDropColumn({ addedIndex, removedIndex }) {
      addedIndex -= 2
      removedIndex -= 2
      let cmpOrder = JSON.parse(JSON.stringify(this.$store.getters.cmpOrder))
      cmpOrder.splice(addedIndex, 0, cmpOrder.splice(removedIndex, 1)[0])
      this.$store.dispatch({
        type: 'updateCurrBoard',
        groupId: null,
        taskId: null,
        prop: 'cmpOrder',
        toUpdate: cmpOrder,
      })
    },
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
    toggleColorModal(value = true) {
      this.toggleFocusGroupTitle(value)
      this.isColorModalOpen = value
    },
    toggleFocusGroupTitle(value = true) {
      this.isTitleFocused = value
    },
  },
  computed: {
    labels() {
      let labels = [
        { name: '', width: '40px' },
        { name: '', width: '6px' },
        { name: '', width: '33px' },
      ]
      const cmpOrder = JSON.parse(JSON.stringify(this.$store.getters.cmpOrder))
      labels.push(...cmpOrder.slice(1).map((cmp) => cmp))

      return labels.map((label) => {
        if (label.name === 'taskTitle') label.name = 'task'
        if (label.name === 'txt') label.name = 'text'
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
