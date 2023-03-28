<template>
  <section class="color-picker-wrapper">
    <div class="color-picker">
      <button
        v-for="color in colors"
        class="color-picker-colors"
        :style="{ backgroundColor: color }"
        @mousedown="changeColor(color)"
      ></button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ColorPicker',
  data() {
    return {
      colors: [
        '#037f4c',
        '#00c875',
        '#9cd326',
        '#cab641',
        '#ffcb00',
        '#784bd1',
        '#a25ddc',
        '#a25ddc',
        '#66ccff',
        '#bb3354',
        '#e2445c',
        '#ff158a',
        '#ff5ac4',
        '#ff642e',
        '#fdab3d',
        '#7f5347',
        '#c4c4c4',
        '#808080',
      ],
    }
  },
  emits: ['changeColor'],
  methods: {
    changeColor(color) {
      console.log(color)
      this.$emit('changeColor', 'color', color)
    },
  },
  computed: {},
  created() {},
  components: {},
}
</script>

<style></style>
