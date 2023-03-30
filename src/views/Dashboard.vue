<template>
  <section class="dashboard-container grid">
    <section class="grid-item dashboard-stats flex stats">
      <article class="stat flex">
        <h4>Total board tasks</h4>
        <h2>48</h2>
      </article>
      <article class="stat flex">
        <h4>Board members</h4>
        <h2>4</h2>
      </article>
      <article class="stat flex">
        <h4>Total board groups</h4>
        <h2>8</h2>
      </article>
    </section>

    <PieChart @click="isRadar = !isRadar" v-if="!isRadar" class="grid-item pie1" :chartData="data" :options="options" />
    <PolarAreaChart @click="isRadar = !isRadar" v-if="isRadar" class="grid-item pie1" :chartData="data"
      :options="options" />
    <PieChart @click="isBubble = !isBubble" v-if="!isBubble" class="grid-item pie2" :chartData="data"
      :options="options" />
    <BubbleChart @click="isBubble = !isBubble" v-if="isBubble" class="grid-item pie2" :chartData="data"
      :options="options" />
    <BarChart @click="isLine = !isLine" v-if="!isLine" :width="500" :height="500" class="grid-item bar-chart"
      :chartData="data" :options="options" />
    <LineChart :width="500" :height="500" @click="isLine = !isLine" class="grid-item bar-chart" v-if="isLine"
      :chartData="data" :options="options" />
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
} from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'awesome-chart',

  components: {
    BarChart,
    PieChart,
    LineChart,
    PolarAreaChart,
    BubbleChart,
    ScatterChart,
  },
  data() {
    return {
      data: {
        labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
        datasets: [
          {
            data: [30, 40, 60, 70, 5],
            backgroundColor: [
              'red',
              '#77CEFF',
              '#0079AF',
              '#123E6B',
              '#97B0C4',
              '#A5C8ED',
            ],
          },
        ],
      },

      isLine: false,
      isRadar: false,
      isBubble: false,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    }
  },
}
</script>
<style>
.grid {
  display: grid;
}

.flex {
  display: flex;
}

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

  .stat {
    height: 100%;
    font-size: 1.15rem;
  }

  .stat h2 {
    font-size: 72px;
  }
}
</style>
