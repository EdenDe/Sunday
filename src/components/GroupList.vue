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
  computed: {},
  created() {
    console.log("GroupList", this.groups);
  },
  components: {
    DraggableNext: VueDraggableNext,
    GroupPreview,
  },
};
</script>

