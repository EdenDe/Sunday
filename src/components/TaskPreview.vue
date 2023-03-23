<template>
  <section class="task-preview grid" v-for="(cmp, idx) in cmpOrder" :key="idx">
    <component
      :is="cmp"
      :info="task[cmp]"
      :taskId="task.id"
      @updateProp="updateProp"
    />
  </section>
</template>

<script>
import checkbox from "./dynamicCmps/Checkbox.vue";
import date from "./dynamicCmps/Date.vue";
import person from "./dynamicCmps/Person.vue";
import priority from "./dynamicCmps/Priority.vue";
import status from "./dynamicCmps/Status.vue";
import TaskTitle from "./dynamicCmps/Title.vue";

export default {
  name: "TaskPreview",
  props: {
    task: Object,
  },
  emits: ["updateProp"],
  methods: {
    updateProp(prop, toUpdate) {
      this.$emit("updateProp", this.task.id, prop, toUpdate);
    },
  },
  computed: {
    cmpOrder() {
      return this.$store.getters.cmpOrder;
    },
  },
  components: {
    checkbox,
    date,
    person,
    priority,
    status,
    TaskTitle,
  },
};
</script>
