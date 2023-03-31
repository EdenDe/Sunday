<template>
  <section class="dashboard-container grid">
    <div class="grid dashboard-inner-layout">
      <section class="dashboard-stats grid">
        <article class="stat item grid">
          <h4>Total board tasks</h4>
          <h2>{{ sumOfTasks }}</h2>
        </article>
        <article class="stat item grid">
          <h4>Board members</h4>
          <h2>{{ board.members.length }}</h2>
        </article>
        <article class="stat item grid">
          <h4>Total board groups</h4>
          <h2>{{ board.groups.length }}</h2>
        </article>
      </section>

      <section class="item person-chart">
        <h4> person tasks number </h4>
        <PieChart @click="() => isPersonPie = !isPersonPie" v-if="isPersonPie" :chartData="taskPerPerson"
          :options="options" />
        <BarChart v-else @click="() => isPersonPie = !isPersonPie" :chartData="taskPerPerson"
          :options="horizontalOptions" />
      </section>
      <section class="item priority-chart">
        <h4> tasks number by priority </h4>
        <BarChart @click="() => isPriorityBar = !isPriorityBar" v-if="isPriorityBar" :width="500" :height="500"
          :chartData="priority" :options="options" />
        <DoughnutChart v-else :width="500" :height="500" @click="() => isPriorityBar = !isPriorityBar"
          :chartData="priority" :options="options" />
      </section>
      <section class="item status-chart">
        <h4> tasks number by status </h4>
        <BarChart @click="() => isStatusBar = !isStatusBar" v-if="isStatusBar" :width="500" :height="500"
          :chartData="status" :options="options" />
        <DoughnutChart v-else :width="500" :height="500" @click="() => isStatusBar = !isStatusBar" :chartData="status"
          :options="options" />
      </section>
    </div>
  </section>
</template>

<script>
import {
  PolarAreaChart,
  BubbleChart,
  BarChart,
  PieChart,
  LineChart,
  ScatterChart,
  DoughnutChart
} from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'dashboard',
  computed: {
    horizontalOptions() {
      let options = JSON.parse(JSON.stringify(this.options))
      options.indexAxis = 'y'
      return options
    },
    board() {
      return this.$store.getters.currBoard
    },
    sumOfTasks() {
      return this.$store.getters.sumOfTasks
    },
    priority() {
      let taskPerLabel = {}
      const priorityLabel = { ...this.$store.getters.priorityLabels }

      this.board.groups.forEach((group) => {
        taskPerLabel = group.tasks.reduce((label, task) => {
          if (!label[task.priority]) label[task.priority] = 0
          label[task.priority] += 1
          return label
        }, taskPerLabel)
      })

      const labels = []
      const colors = []
      const data = []

      for (let label in priorityLabel) {
        const priority = priorityLabel[label]
        labels.push(priority.title === "" ? 'No priority' : priority.title)
        data.push(taskPerLabel[priority.title])
        colors.push(priority.color)
      }

      return {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
        }]
      }
    },
    status() {
      let taskPerLabel = {}
      const statusLabel = { ...this.$store.getters.statusLabels }

      this.board.groups.forEach((group) => {
        taskPerLabel = group.tasks.reduce((label, task) => {
          if (!label[task.status]) label[task.status] = 0
          label[task.status] += 1
          return label
        }, taskPerLabel)
      })

      const labels = []
      const colors = []
      const data = []

      for (let label in statusLabel) {
        const status = statusLabel[label]
        labels.push(status.title === "" ? 'No Status' : status.title)
        data.push(taskPerLabel[status.title])
        colors.push(status.color)
      }

      return {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
        }]
      }
    },
    taskPerPerson() {
      let res = {}
      const members = this.board.members

      this.board.groups.forEach((group) => {
        res = group.tasks.reduce((obj, task) => {
          task.person.forEach(person => {
            if (!obj[person.fullname]) obj[person.fullname] = 0
            obj[person.fullname] += 1
          })
          return obj
        }, res)
      })

      const labels = []
      const colors = []
      const data = []

      for (let member in members) {
        const person = members[member]
        labels.push(person.fullname)
        data.push(res[person.fullname] || 0)
        colors.push(person.color)
      }

      return {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
        }]
      }
    }
  }
  ,
  data() {
    return {
      isPriorityBar: true,
      isStatusBar: true,
      isPersonPie: true,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
      },
    }
  },
  components: {
    BarChart,
    PieChart,
    LineChart,
    PolarAreaChart,
    BubbleChart,
    ScatterChart,
    DoughnutChart
  },
}
</script>
<!-- <style>

.dashboard-container.grid {
  box-shadow: 0 0 4px 1px #c3c3c3;
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.75fr 0.75fr 1fr;
  /* gap: 20px 16px; */
  /* width: 800px; */
  /* height: 100%; */
  grid-template-areas:
    'stats stats'
    'pie1 pie2'
    'bar-chart bar-chart ';
}

.bar-chart {
  grid-area: bar-chart;
}

.bar-chart #bar-chart,
.bar-chart #line-chart {
  /* width: 400px; */
  aspect-ratio: 2/1;
}

.pie1 {
  grid-area: pie1;
}

.pie2 {
  grid-area: pie2;
}

.stats {
  grid-area: stats;
  gap: 1em;
  justify-content: space-between;
}

.dashboard-stats {
  /* background: lightblue; */
  width: 100%;
}

.stat {
  justify-content: space-evenly;
  flex-direction: column;
  text-align: center;
  flex: 1;
  box-shadow: 0 0 2px grey;
  border-radius: 6px;
  height: 75%;
  font-size: 1rem;
}

.stat h2 {
  font-size: 50px;
}

@media (min-width: 500px) {
  .dashboard-container.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1.5fr;
    grid-template-rows: 1fr 1fr;
    gap: 16px 16px;
    /* width: 800px; */
    /* height: 580px; */
    grid-template-areas:
      'stats stats stats pie1'
      'bar-chart bar-chart bar-chart pie2';
  }

  .bar-chart {
    grid-area: bar-chart;
  }

  .bar-chart #bar-chart,
  .bar-chart #line-chart {
    /* width: 400px; */
    aspect-ratio: 2/1;
  }

  .pie1 {
    grid-area: pie1;
  }

  .pie2 {
    grid-area: pie2;
  }

  .stats {
    grid-area: stats;
  }

  .stat h2 {
    font-size: 72px;
  }
}
</style> -->
