<template>
  <div class="board-container board-layout">
    <div>
      <BoardHeader />
      <GroupList :groups="groups"></GroupList>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import BoardHeader from "../components/BoardHeader.vue";
import GroupList from "../components/GroupList.vue";
export default {
  computed: {
    groups() {
      return this.$store.getters.groups;
    },
  },
  components: {
    BoardHeader,
    GroupList,
    Container,
    Draggable,
  },
};
</script>

