<template>
  <section class="task-title grid">
    <span contenteditable @focusout="onType($event.target.innerText)">
      {{ txt }}
    </span>

    <!-- <RouterLink v-icon="'chatBubble'" /> -->
  </section>
</template>

<script>
export default {
  name: "TaskTitle",
  props: {
    info: String,
    taskId: String,
  },
  emits: ["updateProp"],
  data() {
    return {
      txt: this.info,
    };
  },
  watch: {
    info() {
      this.txt = this.info;
    },
  },
  methods: {
    onType(txt) {
      this.txt = txt;
      this.$emit("updateProp", "taskTitle", txt);
    },
  },
};
</script>
