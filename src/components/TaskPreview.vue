<template>
  <section class="task-preview grid" v-for="(cmp, idx) in cmpOrder" :key="idx">
    <component :is="cmp" :info="task[cmp]" @updateProp="updateProp" />
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
  methods: {
    updateProp(prop, toUpdate) {
      this.$emit('updateProp', this.task.id, prop, toUpdate)
    }
  },
  computed: {
    cmpOrder() {
      return this.$store.getters.cmpOrder
    }
  },
  created() {
    // console.log("TaskPreview", this.task)

  },
  components: {
    checkbox,
    date,
    person,
    priority,
    status,
    TaskTitle
  },
  emits: ['updateProp']

}
</script>

<style></style>