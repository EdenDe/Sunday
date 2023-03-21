<template>
  <section class="task-preview grid" v-for="(cmp, idx) in cmpOrder" :key="idx">
    <component :is="cmp" :info="task[cmp]"></component>
  </section>
</template>

<script>
import checkbox from "./DynamicCmps/Checkbox.vue";
import date from "./DynamicCmps/Date.vue";
import person from "./DynamicCmps/Person.vue";
import priority from "./DynamicCmps/Priority.vue";
import status from "./DynamicCmps/Status.vue";
import TaskTitle from "./DynamicCmps/Title.vue";

export default {
  name: 'TaskPreview',
  props: {
    task: Object
  },
  data() {
    return {

    }
  },

  computed: {
    cmpOrder() {
      return this.$store.getters.cmpOrder
    }
  },
  created() {
    console.log("TaskPreview", this.task)

  },
  components: {
    checkbox,
    date,
    person,
    priority,
    status,
    TaskTitle
  },
}
</script>

<style></style>