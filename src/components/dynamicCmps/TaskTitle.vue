<template>
  <p class="title">{{ info }}</p>
</template>

<script>
export default {
  name: "TaskTitle",
  props: {
    info: String,
  },
  data() {
    return {};
  },
};
</script>

