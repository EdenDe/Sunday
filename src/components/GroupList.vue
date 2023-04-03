<template>
  <section class="group-list">
    <Container @drop="onDrop">
      <component :is="dragCmp" v-for="group in groups" :key="group.id" class="group-list-draggable">
        <GroupPreview :group="group" @addGroup="onAddGroup" @removeGroup="removeGroup" />
      </component>
    </Container>
    <button class="btn-add-group flex justify-center align-center" @click="onAddGroup()">
      <AddIcon class="add-icon icon" />
      Add new group
    </button>
  </section>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import { boardService } from '../services/board.service'
import GroupPreview from './GroupPreview.vue'
import AddIcon from '../assets/icons/Add.svg'

export default {
  name: 'GroupList',
  props: {
    groups: Array,
  },
  methods: {
    onDrop({ addedIndex, removedIndex }) {
      document.activeElement.blur()
      let groupList = this.groups
      groupList.splice(addedIndex, 0, groupList.splice(removedIndex, 1)[0])
      this.updateBoard('groups', groupList)
    },
    onAddGroup(group) {
      console.log(this.groups)
      const groups = this.groups
      const newGroup = group || boardService.getEmptyGroup()
      groups.push(newGroup)
      this.updateBoard('groups', groups)
      const activity = boardService.addActivity('Created', newGroup.title)
      this.updateBoard('activities', activity, newGroup.color)
    },
    removeGroup(groupId) {
      const groups = this.groups.filter((group) => group.id !== groupId)
      this.updateBoard('groups', groups)
    },
    updateBoard(prop, groups) {
      this.$emit('updateBoard', prop, groups)
    },
  },
  computed: {
    dragCmp() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return 'div'
      } else {
        return 'Draggable'
      }
    },
  },
  components: {
    GroupPreview,
    Container,
    Draggable,
    AddIcon,
  },
}
</script>
