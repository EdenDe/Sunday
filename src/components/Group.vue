<template>
  <section class="group-list">
    <!-- render group labels by labels array -->
    <section>
      <DraggableNext class="labels-grid" v-model="labels" @change="log">
        <div v-for="label in labels" :key="label">{{ label }}</div>
      </DraggableNext>
    </section>

    <!-- render tasks by cmp order -->
    <DraggableNext v-model="group.tasks" @change="log">
      <section class="group grid" v-for="task in group.tasks" :key="task.id">
        <section class="grid-item" v-for="(cmp, idx) in cmpOrder" :key="idx">
          <component :is="cmp" :info="task[cmp]"></component>
        </section>
      </section>
    </DraggableNext>
    <!-- render progress by progress array -->
    <section class="progress-grid">
      <div v-for="(item, idx) in progress" :key="idx">{{ item }}</div>
    </section>
  </section>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { VueDraggableNext } from "vue-draggable-next";

import TaskCheckbox from "./dynamicCmps/TaskCheckBox.vue";
import TaskDate from "./dynamicCmps/TaskDate.vue";
import TaskMembers from "./dynamicCmps/TaskMembers.vue";
import TaskPriority from "./dynamicCmps/TaskPriority.vue";
import TaskStatus from "./dynamicCmps/TaskStatus.vue";
import TaskTitle from "./dynamicCmps/TaskTitle.vue";
import ToolTip from "./Cmps/ToolTip.vue";
export default {
  name: "group",
  props: {
    group: Object,
  },
  data() {
    return {
      labelsPrint: [],
      //TODO: object with cmps names and labels and progress
      cmpOrder: [
        "TaskCheckbox",
        "TaskTitle",
        "TaskStatus",
        "TaskPriority",
        "TaskMembers",
        "TaskDate",
      ],
      labels: ["groupName", null, "status", "members", "priority", "date"],
      // labels: ["groupName", null, "status", "members", "priority", "date"],
      progress: [null, null, "status", null, "priority", null],
    };
  },
  methods: {
    onDrop(ev) {
      console.log(ev);
    },
    start(ev) {
      console.log(":start", ev);
    },
    log(event) {
      console.log(event);
      console.log("this.labels:", this.labels);
    },
  },
  computed: {},
  created() {},
  components: {
    DraggableNext: VueDraggableNext,
    TaskCheckbox,
    TaskDate,
    TaskMembers,
    TaskPriority,
    TaskStatus,
    TaskTitle,
    ToolTip,
  },
};
</script>

<style>
.grid {
  background: lightblue;
  display: grid;
  grid-template-columns: 2% 200px 1fr 1fr 1fr 1fr;
  justify-content: center;
}

.group:ntn-child(2) {
  position: sticky;
  z-index: 10;
  left: 0;
}

.labels-grid,
.progress-grid {
  width: 100%;
  background: rgb(214, 104, 104);
  display: grid;
  grid-template-columns: 2% 2fr 1fr 1fr 1fr 1fr;
  justify-content: center;
}

.group-list {
  margin-top: 2em;
}
</style>
