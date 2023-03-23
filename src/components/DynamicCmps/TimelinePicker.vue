<template>
  <section class="timeline-picker">
    <div class="timeline-display">
      <label
        :for="taskId + 'Timeline'"
        class="timeline-label"
        :class="{ 'active-timeline': dates.length }"
      >
        <el-date-picker
          v-model="dates"
          @change="onChangeDate"
          type="daterange"
          format="M D"
          value-format="x"
          range-separator=""
          start-placeholder=""
          end-placeholder=""
          :id="taskId + 'Timeline'"
        />
        {{ formattedDates }}
      </label>
    </div>
  </section>
</template>

<script>
export default {
  name: "Date",
  props: {
    info: Array,
    taskId: String,
  },
  created() {},
  data() {
    return {
      dates: [],
    };
  },
  methods: {
    onChangeDate() {
      console.log(this.date);
    },
  },
  computed: {
    formattedDates() {
      if (!this.info) return "";
      const formattedDatesArray = this.info.map((info) => {
        return new Intl.DateTimeFormat("en-He", {
          month: "short",
          day: "numeric",
        }).format(info);
      });
      console.log(formattedDatesArray);
    },
  },
};
</script>
