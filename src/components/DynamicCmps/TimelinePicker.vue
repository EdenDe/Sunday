<template>
  <section class="timeline-picker">
    <div class="timeline-display">
      <label
        :data-diff="formattedDaysRange"
        :for="taskId + 'Timeline'"
        class="timeline-label"
        :class="{ 'active-timeline': timeline?.length }"
        :style="
          timeline?.length
            ? {
                background: ` linear-gradient(90deg, ${groupColor} ${gridientColor.start}, #323232 ${gridientColor.start})`,
              }
            : null
        "
      >
        {{ formattedDates }}
        <el-date-picker
          v-model="timeline"
          @change="onChangeTimeline"
          type="daterange"
          format="M D"
          value-format="x"
          range-separator=""
          start-placeholder=""
          end-placeholder=""
          :id="taskId + 'Timeline'"
        />
        <i
          v-if="timeline.length"
          v-icon="'closeSmall'"
          @click.prevent="onRemoveTimeline"
        ></i>
      </label>
    </div>
  </section>
</template>

<script>
import { utilService } from '../../services/util.service'
export default {
  name: 'Timeline',
  props: {
    info: Array,
    taskId: String,
  },
  data() {
    return {
      timeline: [],
    }
  },
  created() {
    this.setTimeline()
  },
  methods: {
    onChangeTimeline() {
      if (!this.timeline || !this.timeline.length) return
      this.$emit('updateProp', 'timeline', this.timeline)
    },
    setTimeline() {
      this.timeline = this.info
    },
    onRemoveTimeline() {
      this.$emit('updateProp', 'timeline', [])
    },
  },
  watch: {
    info() {
      this.setTimeline()
    },
  },
  computed: {
    formattedDates() {
      if (!this.timeline || !this.timeline.length) return ' - '
      return utilService.formatDateRange(this.timeline)
    },
    formattedDaysRange() {
      if (!this.timeline || !this.timeline.length) return ' - '
      return utilService.getDaysBetween(this.timeline)
    },
    groupColor() {
      const groups = this.$store.getters.groups
      if (groups) {
        const containingGroup = groups.find((group) =>
          group.tasks.some((task) => task.id === this.taskId)
        )
        if (containingGroup) {
          return containingGroup.color
        }
      }
      return null // Return null if the task is not found in any group
    },
    gridientColor() {
      const [startDate, endDate] = this.timeline

      let fullDiff = utilService.getDaysBetweenNumber(this.timeline)
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
  },
}
</script>
