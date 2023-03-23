<template>
  <section class="timeline-picker">
    <div class="timeline-display">
      <label :data-diff="formattedDaysRange" :for="taskId + 'Timeline'" class="timeline-label"
        :class="{ 'active-timeline': timeline?.length }">
        {{ formattedDates }}
        <el-date-picker v-model="timeline" @change="onChangeTimeline" type="daterange" format="M D" value-format="x"
          range-separator="" start-placeholder="" end-placeholder="" :id="taskId + 'Timeline'" />
      </label>
    </div>
  </section>
</template>

<script>
import { utilService } from "../../services/util.service";
export default {
  name: "Timeline",
  props: {
    info: Array,
    taskId: String,
  },
  created() {
    this.timeline = this.info;
  },
  data() {
    return {
      timeline: [],
    };
  },
  methods: {
    onChangeTimeline() {
      if (!this.timeline || !this.timeline.length) return;
      console.log(this.timeline);
      this.$emit("updateProp", "timeline", this.timeline);
    },
  },
  computed: {
    formattedDates() {
      if (!this.timeline || !this.timeline.length) return "-";
      return utilService.formatDateRange(this.timeline);
    },
    formattedDaysRange() {
      if (!this.timeline || !this.timeline.length) return "-";
      return utilService.getDaysBetween(this.timeline);
    },
  },
};
</script>
