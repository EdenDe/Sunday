<template>
  <section class="group-list">
    <div v-for="group in groups" :key="group.id">
      <GroupPreview :group="group" />
    </div>
  </section>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import GroupPreview from "./GroupPreview.vue";

export default {
  name: "GroupList",
  props: {
    groups: Array,
  },
  components: {
    DraggableNext: VueDraggableNext,
    GroupPreview,
  },
};
</script>

