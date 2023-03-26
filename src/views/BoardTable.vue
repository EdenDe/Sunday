<template>
  <div class="board-table">
    <GroupList @updateBoard="updateBoard" :groups="groups"></GroupList>
  </div>
  <RouterView />
</template>
<script>
import GroupList from '../components/GroupList.vue'
export default {
  computed: {
    groups() {
      const board = JSON.parse(JSON.stringify(this.$store.getters.currBoard || {}))
      return board.groups
    },
  },
  methods: {
    updateBoard(prop, toUpdate) {
      this.$store.dispatch({
        type: 'updateCurrBoard',
        groupId: null,
        taskId: null,
        prop: prop,
        toUpdate,
      })
    },
  },
  components: {
    GroupList,
  },
}
</script>
