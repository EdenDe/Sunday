<template>
  <section class="timeline-picker">
    <div class="timeline-display">
      <div class="timeline-pill">Mar 12</div>

      <!-- <el-date-picker
        v-model="date"
        @change="onChangeDate"
        type="daterange"
        format="M D"
        value-format="x"
        range-separator=""
        start-placeholder=""
        end-placeholder=""
        autosize
      /> -->
    </div>
  </section>
</template>

<script>
export default {
  name: "Date",
  props: {},
  created() {},
  data() {
    return {
      date: null,
    };
  },
  methods: {
    onChangeDate() {
      console.log(this.date);
    },
  },
  computed: {
    rangeSeparator() {
      return this.date ? "-" : "";
    },
  },
};
</script>

<style></style>
