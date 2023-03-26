<template>
  <section class="group-list">
    <Container @drop="onDrop">
      <Draggable v-for="group in groups" :key="group.id">
        <GroupPreview
          :group="group"
          @addGroup="addGroup"
          @removeGroup="removeGroup"
          @copyGroup="copyGroup"
        />
      </Draggable>
    </Container>
    <button
      class="btn-add-group flex justify-center align-center"
      @click="onAddGroup"
    >
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
      let groupList = this.groups
      groupList.splice(addedIndex, 0, groupList.splice(removedIndex, 1)[0])
      this.updateBoard(groupList)
    },
    addGroup(group) {
      const groups = this.groups
      const newGroup = group || boardService.getEmptyGroup()
      groups.push(newGroup)
      this.updateBoard(groups)
    },
    removeGroup(groupId) {
      const groups = this.groups.filter((group) => group.id !== groupId)
      this.updateBoard(groups)
    },
    updateBoard(groups) {
      this.$emit('updateBoard', 'groups', groups)
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
