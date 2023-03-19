<template>
  <p class="status">{{ info }}</p>
</template>

<script>
export default {
  name: "TaskStatus",
  props: {
    info: String,
  },
};
</script>

