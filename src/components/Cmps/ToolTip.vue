<template>
  <div
    class="tooltip-container"
    @mouseover="showTooltip"
    @mouseout="hideTooltip"
  >
    <slot></slot>
    <div class="tooltip">
      <div class="tooltip-content">{{ content }}</div>
      <div class="tooltip-arrow"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    showTooltip() {
      this.visible = true;
    },
    hideTooltip() {
      this.visible = false;
    },
  },
};
</script>
