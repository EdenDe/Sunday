<template>
  <section class="progress-bar justify-center" v-if="tasks">
    <div :style="{ width: '40px' }"></div>
    <div v-if="isClose" :style="{ width: '6px', backgroundColor: groupColor }"></div>
    <div v-else :style="{ width: '6px' }"></div>
    <div v-for="(item, idx) in cmpOrder" :key="idx" :style="{ width: item.width }">
      <div v-if="item.name === 'status' || item.name === 'priority'" class="flex progress-container" :class="item.name">
        <div v-for="label in groupStatusProgress(item.name)" v-tooltip="label.title" :style="{
          flex: 1,
          'flex-basis': label.width,
          backgroundColor: label.color,
        }"></div>
      </div>
      <div v-else-if="item.name === 'timeline'" class="flex timeline-display">
        <label :data-diff="groupTimelineProgressRange" class="timeline-label active-timeline" :style="
          progressTimeline?.length
            ? {
              background: ` linear-gradient(90deg, ${groupColor} ${gradientPercent}, #323232 ${gradientPercent})`,
            }
            : null
        ">
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
            let percentageWidth = (res[title] / totalTaskLength) * 100

            res[title] = {
              width: Math.round(percentageWidth) + '%',
              color: color,
              title: `${title} ${res[title]
                }/${totalTaskLength} ${percentageWidth.toFixed(1)}%`,
            }
          }
        })
        return res
      }
    },
    gradientPercent() {
      const [startDate] = this.progressTimeline
      let fullDiff = utilService.getDaysBetweenNumber(this.progressTimeline)
      let startToToday =
        utilService.getDaysBetweenNumber([startDate, Date.now()]) - 1
      return Math.round((startToToday / fullDiff) * 100) + '%'
    },
    groupTimelineProgressDates() {
      if (!this.progressTimeline) return '-'
      return utilService.formatDateRange(this.progressTimeline)
    },
    groupTimelineProgressRange() {
      if (!this.progressTimeline) return '-'
      return utilService.getDaysBetween(this.progressTimeline)
    },
    progressTimeline() {
      const timestamps = this.tasks.map((task) => [...task['timeline']]).flat()
      if (!timestamps?.length) return

      let minTimestamp = Math.min(...timestamps)
      let maxTimestamp = Math.max(...timestamps)

      return [minTimestamp, maxTimestamp]
    },
  },
}
</script>
