<template>
  <section class="progress-bar justify-center" v-if="tasks">
    <div :style="{ width: '40px' }"></div>
    <div
      v-if="isClose"
      :style="{ width: '6px', backgroundColor: groupColor }"
    ></div>
    <div v-else :style="{ width: '6px' }"></div>
    <div
      v-for="(item, idx) in cmpOrder"
      :key="idx"
      :style="{ width: item.width }"
    >
      <div
        v-if="item.name === 'status' || item.name === 'priority'"
        class="flex progress-container"
        :class="item.name"
      >
        <div
          v-for="label in groupStatusProgress(item.name)"
          v-tooltip="label.title"
          :style="{
            flex: 1,
            'flex-basis': label.width,
            backgroundColor: label.color,
          }"
        ></div>
      </div>
      <div v-else-if="item.name === 'timeline'" class="flex timeline-display">
        <label
          :data-diff="groupTimelineProgressRange"
          class="timeline-label active-timeline"
          :style="
            progressTimeline?.length
              ? {
                  background: ` linear-gradient(90deg, ${groupColor} ${gridientColor.start}, #323232 ${gridientColor.start})`,
                }
              : null
          "
        >
          {{ groupTimelineProgressDates }}
        </label>
      </div>
      <div v-else :class="item['name']"></div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilService } from '../services/util.service'
export default {
  name: 'ProgressBar',
  props: {
    tasks: Array,
    groupColor: String,
    isClose: Boolean,
  },
  data() {
    return {
      progressTimeline: null,
    }
  },
  watch: {
    tasks: {
      handler() {
        this.setProgressTimeline()
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    setProgressTimeline() {
      const timestamps = this.tasks.map((task) => [...task['timeline']]).flat()
      if (!timestamps?.length) return

      let minTimestamp = Math.min(...timestamps)
      let maxTimestamp = Math.max(...timestamps)

      this.progressTimeline = [minTimestamp, maxTimestamp]
    },
  },
  computed: {
    ...mapGetters(['cmpOrder', 'statusLabels', 'priorityLabels']),
    groupStatusProgress() {
      if (!this.tasks) return
      return (item) => {
        let res = this.tasks.reduce((obj, task) => {
          if (!obj[task[item]]) obj[task[item]] = 0
          obj[task[item]] += 1
          return obj
        }, {})

        let labels =
          item === 'status' ? [...this.statusLabels] : [...this.priorityLabels]

        let totalTaskLength = this.tasks?.length

        labels.forEach(({ title, color }) => {
          if (res[title]) {
            let presentageWidth = (res[title] / totalTaskLength) * 100

            res[title] = {
              width: Math.round(presentageWidth) + '%',
              color: color,
              title: `${title} ${
                res[title]
              }/${totalTaskLength} ${presentageWidth.toFixed(1)}%`,
            }
          }
        })
        return res
      }
    },
    gridientColor() {
      const [startDate, endDate] = this.progressTimeline

      let fullDiff = utilService.getDaysBetweenNumber(this.progressTimeline)
      let startToToday =
        utilService.getDaysBetweenNumber([startDate, Date.now()]) - 1
      let todayToEnd = utilService.getDaysBetweenNumber([Date.now(), endDate])

      if (todayToEnd < 0 || startToToday < 0) {
        return {
          start: todayToEnd < 0 ? '100%' : '0%',
        }
      }
      let presentageStart = Math.round((startToToday / fullDiff) * 100) + '%'

      return {
        start: presentageStart,
      }
    },
    groupTimelineProgressDates() {
      if (!this.progressTimeline) return '-'
      return utilService.formatDateRange(this.progressTimeline)
    },
    groupTimelineProgressRange() {
      if (!this.progressTimeline) return '-'
      return utilService.getDaysBetween(this.progressTimeline)
    },
  },
}
</script>
