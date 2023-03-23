<template>
  <section class="task-date">
    <el-date-picker
      :id="taskId + 'Date'"
      type="date"
      placeholder="Pick a day"
      size="small"
      format="MMM D"
      value-format="x"
      class="date-picker-container"
      ref="date-picker"
      v-model="date"
      @change="onChangeDate"
    />
  </section>
</template>

<script>
export default {
  name: "Date",
  props: {
    info: Number,
    taskId: String,
  },
  created() {
    this.date = this.info;
  },
  data() {
    return {
      date: null,
    };
  },
  computed: {
    formattedDate() {
      if (!this.info) return "";
      return new Intl.DateTimeFormat("en-He", {
        month: "short",
        day: "numeric",
      }).format(this.info);
    },
  },
  methods: {
    onChangeDate() {
      this.$emit("updateProp", "date", this.date);
    },
  },
};
</script>
