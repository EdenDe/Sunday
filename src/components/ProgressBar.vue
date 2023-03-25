<template>
  <section class="progress-bar justify-center" v-if="tasks">
    <div v-for="value in Array(2).fill(null)"></div>
    <div v-for="(item, idx) in cmpOrder" :key="idx">
      <div v-if="item === 'status' || item === 'priority'" class="flex progress-container" :class="item">
        <div v-for="label in groupStatusProgress(item)" :style="{
          flex: 1,
          'flex-basis': label.width,
          backgroundColor: label.color,
        }"></div>
      </div>
      <div v-else-if="item === 'timeline'" class="flex timeline-display">
        <label :data-diff="groupTimelineProgressRange" class="timeline-label active-timeline">
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
      immediate: true
    }
  },
  methods: {
    setProgressTimeline() {
      const timestamps = this.tasks.map(task => [...task['timeline']]).flat()
      if (!timestamps.length) return

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

        let totalTaskLength = this.tasks.length

        labels.forEach(({ title, color }) => {
          if (res[title]) {
            let presentageWidth = (res[title] / totalTaskLength) * 100

            res[title] = {
              width: Math.round(presentageWidth) + '%',
              color: color,
              title: `${title} ${res[title]
                }/${totalTaskLength} ${presentageWidth.toFixed(1)}%`,
            }
          }
        })
        return res
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
