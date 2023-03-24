<template>
  <div class="board-table">
    <GroupList :groups="groups" @onDrop="onDrop"></GroupList>
    <button
      class="btn-add-group flex justify-center align-center"
      @click="onAddGroup"
    >
      <i v-icon="'workspacePlus'"></i>
      Add new group
    </button>
  </div>
</template>
<script>
import GroupList from "../components/GroupList.vue";
export default {
  computed: {
    groups() {
      return this.$store.getters.groups;
    },
  },
  methods: {
    onDrop({ addedIndex, removedIndex }) {
      let groupList = JSON.parse(JSON.stringify(this.groups));
      groupList.splice(addedIndex, 0, groupList.splice(removedIndex, 1)[0]);
      this.updateBoard(groupList);
    },
    onAddGroup() {
      const groupList = JSON.parse(JSON.stringify(this.groups));
      const newGroup = boardService.getEmptyGroup();
      groupList.push(newGroup);
      this.updateBoard(groupList);
    },
    updateBoard(toUpdate) {
      this.$store.dispatch({
        type: "updateCurrBoard",
        groupId: null,
        taskId: null,
        prop: "groups",
        toUpdate,
      });
    },
  },
  components: {
    GroupList,
  },
};
</script>
