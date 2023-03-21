<template>
  <div class="app-container">
    <GroupList :groups="groups"></GroupList>

  </div>
  <h1>
    <ToolTip content="hiii">ToolTip</ToolTip>
  </h1>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import GroupList from "../components/GroupList.vue";
import ToolTip from "../components/Cmps/ToolTip.vue";
export default {
  methods: {
    onDrop(dropResult) {
      this.groups = this.applyDrag(this.groups, dropResult);
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
    },
    changeIndex(oldIndex, newIndex) { },
  },
  computed: {
    groups() {
      console.log(this.$store.getters.groups)
      return this.$store.getters.groups
    }
  },
  components: {
    GroupList,
    Container,
    Draggable,
    ToolTip,
  },
};
</script>

<style></style>
