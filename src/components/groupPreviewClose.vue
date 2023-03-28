<template>
  <section class="group-preview-close grid-title">
    <div class="group-actions-wrapper sticky">
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
            @copy="copyGroup"
            @renameTitle="focusGroupName"
            @openColorPicker="openColorPicker"
            @remove="$emit('removeGroup', group.id)"
          />
        </div>
      </div>
    </div>

    <div
      class="first-col-color"
      :style="{ backgroundColor: group.color }"
    ></div>
    <div class="open-list" v-tooltip="'Collapse group'">
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
      @updateProp="updateProp"
      @toggleFocusGroupTitle="toggleFocusGroupTitle"
      @toggleColorModal="toggleColorModal"
    />

    <div
      v-for="label in labels"
      :key="label"
      class="group-label"
      :class="label"
    >
      {{ label }}
    </div>
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
  data() {
    return {
      isGroupActionsOpen: false,
    }
  },
  methods: {
    toggleGroupActions(value = false) {
      console.log(value)
      this.isGroupActionsOpen = value
    },
  },

  computed: {
    labels() {
      let labels = []
      labels.push(
        ...this.$store.getters.cmpOrder.slice(2).map((cmp) => cmp.name)
      )

      return labels.map((label) => {
        if (label === 'txt') label = 'text'
        return label
      })
    },
    tasksNumber() {
      if (this.group.tasks?.length) return this.group.tasks.length
      else return 'No '
    },
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
