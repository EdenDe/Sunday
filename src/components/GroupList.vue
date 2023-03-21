<template>
  <section class="group-list">
    <!-- //TODO:check if container and draggable needed -->

    <!-- <Container orientation="vertical" @drop="onDrop"> -->
    <div v-for="group in groups" :key="group.id">
      <GroupPreview :group="group" />
    </div>
    <!-- </Container> -->
  </section>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { VueDraggableNext } from "vue-draggable-next";
import GroupPreview from "./GroupPreview.vue";

export default {
  name: "GroupList",
  props: {
    groups: Array,
  },
  data() {
    return {
      labelsPrint: [],
      //TODO: object with cmps names and labels and progress

      // labels: ["groupName", null, "status", "members", "priority", "date"],
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
  computed: {

  },
  created() {
    console.log("GroupList", this.groups)
  },
  components: {
    DraggableNext: VueDraggableNext,
    GroupPreview
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
