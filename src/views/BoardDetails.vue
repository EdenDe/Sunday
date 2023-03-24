<template>
  <div class="board-container board-layout">
    <BoardHeader />
    <div>
      <GroupList :groups="groups" @onDrop="onDrop"></GroupList>
      <button class="btn-add-group flex justify-center align-center">
        <i v-icon="'workspacePlus'"></i>
        Add new group
      </button>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import BoardHeader from '../components/BoardHeader.vue'
import GroupList from '../components/GroupList.vue'
export default {
  computed: {
    groups() {
      return this.$store.getters.groups
    },
  },
  methods: {
    onDrop({ addedIndex, removedIndex }) {
      let groupList = JSON.parse(JSON.stringify(this.groups))
      groupList.splice(addedIndex, 0, groupList.splice(removedIndex, 1)[0])
      this.$store.dispatch({
        type: 'updateCurrBoard',
        groupId: null,
        taskId: null,
        prop: 'groups',
        toUpdate: groupList,
      })
    },
  },
  components: {
    BoardHeader,
    GroupList,
    Container,
    Draggable,
  },
}
</script>
