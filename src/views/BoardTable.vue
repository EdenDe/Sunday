<template>
  <div class="board-table">
    <GroupList
      @on-add-group="onAddGroup"
      :groups="groups"
      @onDrop="onDrop"
    ></GroupList>
  </div>
  <RouterView />
</template>
<script>
import GroupList from '../components/GroupList.vue'
export default {
  computed: {
    groups() {
      const board = JSON.parse(JSON.stringify(this.$store.getters.currBoard))
      return board.groups
    },
  },
  methods: {
    onDrop({ addedIndex, removedIndex }) {
      let groupList = JSON.parse(JSON.stringify(this.groups))
      groupList.splice(addedIndex, 0, groupList.splice(removedIndex, 1)[0])
      this.updateBoard(groupList)
    },
    onAddGroup() {
      const groupList = JSON.parse(JSON.stringify(this.groups))
      const newGroup = boardService.getEmptyGroup()
      groupList.push(newGroup)
      this.updateBoard(groupList)
    },
    updateBoard(toUpdate) {
      this.$store.dispatch({
        type: 'updateCurrBoard',
        groupId: null,
        taskId: null,
        prop: 'groups',
        toUpdate,
      })
    },
  },
  components: {
    GroupList,
  },
}
</script>
