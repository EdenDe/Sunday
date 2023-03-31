<template>
  <div class="label-picker-container">
    <div class="grid">
      <div
        v-for="(label, index) in labels"
        id="index.label"
        :style="{ backgroundColor: label.color }"
        class="color-picker-label"
        @click="setLabel(label.title)"
      >
        {{ label.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LabelPicker',
  props: { labels: Array },
  methods: {
    setLabel(labelTitle) {
      this.$emit('setLabel', labelTitle)
    },
  },
}
</script>
