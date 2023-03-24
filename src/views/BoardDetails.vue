<template>
  <div class="board-container board-layout">
    <div>
      <BoardHeader />
      <GroupList :groups="groups" @onDrop="onDrop"></GroupList>
      <button class="btn-add-group flex justify-center align-center" @click="onAddGroup">
        <i v-icon="'workspacePlus'"></i>
        Add new group
      </button>
    </div>
  </div>
</template>

<script>
import BoardHeader from "../components/BoardHeader.vue";
import GroupList from "../components/GroupList.vue";
import { boardService } from '../services/board.service'

export default {
  computed: {
    groups() {
      return this.$store.getters.groups;
    },
  },
  methods: {
    onDrop({ addedIndex, removedIndex }) {
      let groupList = JSON.parse(JSON.stringify(this.groups))
      groupList.splice(addedIndex, 0, groupList.splice(removedIndex, 1)[0]);
      this.updateBoard(groupList)
    },
    onAddGroup() {
      const groupList = JSON.parse(JSON.stringify(this.groups))
      const newGroup = boardService.getEmptyGroup()
      groupList.push(newGroup)
      this.updateBoard(groupList)
    },
    updateBoard(toUpdate) {
      this.$store.dispatch({ type: 'updateCurrBoard', groupId: null, taskId: null, prop: 'groups', toUpdate })
    }
  },
  components: {
    BoardHeader,
    GroupList,
  },
};
</script>

