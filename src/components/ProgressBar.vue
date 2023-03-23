<template>
  <section class="progress-bar justify-center" v-if="tasks">
    <div v-for="(item, idx) in cmpOrder" :key="idx">
      <div v-if="item === 'status' || item === 'priority'" class="flex progress-container">
        <div v-for="label in groupStatusProgress(item)" :style="{
          flex: 1,
          'flex-basis': label.width,
          backgroundColor: label.color,
        }">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProgressBar',
  props: {
    tasks: Array,
  },
  computed: {
    ...mapGetters([
      'cmpOrder',
      'statusLabels',
      'priorityLabels',
    ]),
    groupStatusProgress() {
      return item => {
        let res = this.tasks.reduce((obj, task) => {
          if (!obj[task[item]]) obj[task[item]] = 0
          obj[task[item]] += 1
          return obj
        }, {})

        let labels = item === 'status' ? this.statusLabels : this.priorityLabels
        let totalTaskLength = this.tasks.length

        labels.map(({ title, color }) => {
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
  },
}
</script>
