<template>
  <section class="group-list">
    <Container @drop="onDrop">
      <Draggable v-for="group in groups" :key="group.id">
        <GroupPreview :group="group" />
      </Draggable>
    </Container>
  </section>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import GroupPreview from "./GroupPreview.vue";

export default {
  name: "GroupList",
  props: {
    groups: Array,
  },
  methods: {
    onDrop(dropResult) {
      this.$emit('onDrop', dropResult)
    },
  },
  components: {
    GroupPreview,
    Container,
    Draggable
  },
};
</script>

