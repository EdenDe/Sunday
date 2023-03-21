<template>
  <div class="app-container">
    <Container orientation="vertical" @drop="onDrop">
      <div v-for="group in groups" :key="group">
        <Group :group="group"></Group>
      </div>
    </Container>
  </div>
  <h1>
    <ToolTip content="hiii">ToolTip</ToolTip>
  </h1>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import Group from "../components/Group.vue";
import ToolTip from "../components/Cmps/ToolTip.vue";
export default {
  name: "Workspace",
  data() {
    return {
      groups: [
        {
          id: Math.random().toString(36).slice(2),
          color: "red",
          tasks: [
            {
              id: "t101",
              TaskCheckbox: "null",
              TaskTitle: "learn SCSS",
              TaskMembers: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              TaskDate: "27-02-2022",
              TaskStatus: "IN WORK",
              TaskPriority: "LOW",
            },
            {
              id: "t102",
              TaskCheckbox: "null",
              TaskTitle: "learn vue",
              TaskMembers: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              TaskDate: "27-02-2022",
              TaskStatus: "STUCK",
              TaskPriority: "LOW",
            },
            {
              id: "t103",
              TaskCheckbox: "null",
              TaskTitle: "learn js",
              TaskMembers: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              TaskDate: "27-02-2022",
              TaskStatus: "DONE",
              TaskPriority: "LOW",
            },
          ],
        },
        {
          id: Math.random().toString(36).slice(2),
          color: "blue",
          tasks: [
            {
              id: "t101",
              TaskCheckbox: "null",
              TaskTitle: "learn CSS",
              TaskMembers: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              TaskDate: "27-02-2022",
              TaskStatus: "IN WORK",
              TaskPriority: "LOW",
            },
            {
              id: "t102",
              TaskCheckbox: "null",
              TaskTitle: "learn vue",
              TaskMembers: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              TaskDate: "27-02-2022",
              TaskStatus: "STUCK",
              TaskPriority: "LOW",
            },
            {
              id: "t103",
              TaskCheckbox: "null",
              TaskTitle: "learn js",
              TaskMembers: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              TaskDate: "27-02-2022",
              TaskStatus: "DONE",
              TaskPriority: "LOW",
            },
          ],
        },
        {
          id: Math.random().toString(36).slice(2),
          color: "green",
          tasks: [
            {
              id: "t101",
              TaskCheckbox: "null",
              TaskTitle: "learn CSS",
              TaskMembers: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              TaskDate: "27-02-2022",
              TaskStatus: "IN WORK",
              TaskPriority: "LOW",
            },
            {
              id: "t102",
              TaskCheckbox: "null",
              TaskTitle: "learn vue",
              TaskMembers: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              TaskDate: "27-02-2022",
              TaskStatus: "STUCK",
              TaskPriority: "LOW",
            },
            {
              id: "t103",
              TaskCheckbox: "null",
              TaskTitle: "learn js",
              TaskMembers: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              TaskDate: "27-02-2022",
              TaskStatus: "DONE",
              TaskPriority: "LOW",
            },
          ],
        },
      ],
    };
  },
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
    changeIndex(oldIndex, newIndex) {},
  },
  components: {
    Group,
    Container,
    Draggable,
    ToolTip,
  },
};
</script>

<style></style>
