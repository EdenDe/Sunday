<template>
  <section class="task-title grid">
    <span contenteditable @focusout="onType($event.target.innerText)">
      {{ txt }}
    </span>

<<<<<<< HEAD
    <RouterLink v-icon="'chatBubble'" :to="'/board/b101/pulse/' + taskId" />

=======
    <!-- <RouterLink v-icon="'chatBubble'" /> -->
>>>>>>> 9071431f3c7209eb6156c8afbf9057bff2cc44b5
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
  created() {
    console.log(this.$router)
  },
  methods: {
    onType(txt) {
      this.txt = txt;
      this.$emit("updateProp", "taskTitle", txt);
    },
  },
};
</script>
