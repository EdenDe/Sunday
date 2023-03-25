<template>
  <section class="progress-bar justify-center" v-if="tasks">
    <div v-for="value in Array(2).fill(null)"></div>
    <div v-for="(item, idx) in cmpOrder" :key="idx">
      <div
        v-if="item === 'status' || item === 'priority'"
        class="flex progress-container"
        :class="item"
      >
        <div
          v-for="label in groupStatusProgress(item)"
          :style="{
            flex: 1,
            'flex-basis': label.width,
            backgroundColor: label.color,
          }"
        ></div>
      </div>
      <div v-else-if="item === 'timeline'" class="flex timeline-display">
        <label
          :data-diff="groupTimelineProgressRange"
          class="timeline-label active-timeline"
        >
          {{ groupTimelineProgressDates }}
        </label>
      </div>
      <div v-else :class="item"></div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { utilService } from "../services/util.service";
export default {
  name: "ProgressBar",
  props: {
    tasks: Array,
  },
  data() {
    return {
      progressTimeline: null,
    };
  },
  methods: {
    setProgressTimeline() {
      let timeline = this.tasks.reduce(
        (acc, task) => {
          if (task["timeline"].length > 0) {
            let timestamps = [...task["timeline"]];
            let minTimestamp = Math.min(...timestamps);
            let maxTimestamp = Math.max(...timestamps);
            if (minTimestamp < acc[0]) {
              acc[0] = minTimestamp;
            }
            if (maxTimestamp > acc[1]) {
              acc[1] = maxTimestamp;
            }
          }
          return acc;
        },
        [Infinity, -Infinity]
      );
      if (
        !timeline ||
        !timeline.length ||
        timeline[0] === Infinity ||
        timeline[1] === -Infinity
      ) {
        this.progressTimeline = null;
        return;
      }
      console.log(timeline);
      this.progressTimeline = timeline;
    },
  },
  computed: {
    ...mapGetters(["cmpOrder", "statusLabels", "priorityLabels"]),
    groupStatusProgress() {
      return (item) => {
        let res = this.tasks.reduce((obj, task) => {
          if (!obj[task[item]]) obj[task[item]] = 0;
          obj[task[item]] += 1;
          return obj;
        }, {});

        let labels =
          item === "status" ? [...this.statusLabels] : [...this.priorityLabels];

        let totalTaskLength = this.tasks.length;

        labels.forEach(({ title, color }) => {
          if (res[title]) {
            let presentageWidth = (res[title] / totalTaskLength) * 100;

            res[title] = {
              width: Math.round(presentageWidth) + "%",
              color: color,
              title: `${title} ${
                res[title]
              }/${totalTaskLength} ${presentageWidth.toFixed(1)}%`,
            };
          }
        });
        return res;
      };
    },
    groupTimelineProgressDates() {
      this.setProgressTimeline();
      if (!this.progressTimeline) return "-";
      return utilService.formatDateRange(this.progressTimeline);
    },
    groupTimelineProgressRange() {
      this.setProgressTimeline();
      if (!this.progressTimeline) return "-";
      return utilService.getDaysBetween(this.progressTimeline);
    },
  },
};
</script>
