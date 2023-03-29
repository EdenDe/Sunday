<template>
  <section class="group-preview-close grid-title">
    <section class="group-preview-close-first-row">
      <div class="group-actions-wrapper sticky" :style="{ width: '40px' }">
        <div class="svg-wrapper">
          <span
            class="dots-icon"
            @click="toggleGroupActions"
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
              @copy="$emit('copyGroup')"
              @renameTitle="toggleFocusGroupTitle"
              @openColorPicker="toggleColorModal"
              @remove="$emit('removeGroup', group.id)"
            />
          </div>
        </div>
      </div>

      <div
        class="first-col-color"
        :style="{ backgroundColor: group.color, width: '6px' }"
      ></div>
      <div class="open-list" v-tooltip="'Expand group'" style="width: 33px">
        <ArrowDownIcon
          class="open-list-icon icon"
          :style="{ fill: group.color }"
          @click="$emit('toggleOpenList')"
        />
      </div>

      <GroupTitle
        :color="group.color"
        :title="group.title"
        :tasksNumber="tasksNumber"
        :isTitleFocused="isTitleFocused"
        :isColorModalOpen="isColorModalOpen"
        @updateProp="onUpdateProp"
        @toggleFocusGroupTitle="toggleFocusGroupTitle"
        @toggleColorModal="toggleColorModal"
      />

      <div
        v-for="label in labels"
        :key="label.name"
        class="group-label group-closed"
        :class="label.name"
        :style="{ width: label.width }"
      >
        {{ label.name }}
      </div>
    </section>
    <ProgressBar :tasks="group.tasks" :groupColor="group.color" />
  </section>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import GroupTitle from './GroupTitle.vue'
import ProgressBar from './ProgressBar.vue'
import GroupActions from './GroupActions.vue'
//ICONS
import ArrowDownIcon from '../assets/icons/ArrowRight.svg'
import MenuIcon from '../assets/icons/Menu.svg'

export default {
  name: 'GroupPreviewClose',
  props: { group: Object },
  emits: ['updateProp'],
  data() {
    return {
      isGroupActionsOpen: false,
      isColorModalOpen: false,
      isTitleFocused: false,
    }
  },
  methods: {
    onUpdateProp(taskId, prop, value) {
      console.log(taskId, prop, value)
      this.$emit('updateProp', taskId, prop, value)
    },
    toggleColorModal(value = true) {
      this.toggleFocusGroupTitle(value)
      this.isColorModalOpen = value
    },
    toggleFocusGroupTitle(value = true) {
      this.isTitleFocused = value
    },
    toggleGroupActions(value = false) {
      this.isGroupActionsOpen = value
    },
  },

  computed: {
    labels() {
      let labels = []
      labels.push(...this.$store.getters.cmpOrder.slice(2).map((cmp) => cmp))
      return labels.map((label) => {
        if (label === 'txt') label = 'text'
        console.log(label)
        return label
      })
    },
    tasksNumber() {
      if (this.group.tasks?.length) return this.group.tasks.length
      else return 'No '
    },

    // toggleFocusGroupTitle(value) {
    //   this.$emit('toggleFocusGroupTitle', value)
    // },
    // toggleColorModal(value) {
    //   this.$emit('toggleColorModal', value)
    // },
  },
  components: {
    GroupTitle,
    ProgressBar,
    GroupActions,
    ArrowDownIcon,
    MenuIcon,
  },
}
</script>
