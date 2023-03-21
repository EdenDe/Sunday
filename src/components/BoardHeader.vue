<template>
  <section class="board-header">
    <div class="tool-bar grid grid-col">
      <h2 contenteditable="true" class="board-header-title">Sunday</h2>
      <nav>
        <button class="btn icon">
          <div class="icon" v-html="getSvg('home')"></div>
          Main Table
        </button>
        <button class="btn">Kaban</button>
        <button class="btn">+</button>
      </nav>
    </div>
  </section>
</template>

<script>
import { svgService } from '../services/svg.service'
export default {
  name: 'BoardHeader',
  data() {
    return {}
  },
  methods: {
    getSvg(iconName) {
      return svgService.getMailSvg(iconName)
    },
  },
  computed: {},
  created() {},
  components: {},
}
</script>

<style></style>
