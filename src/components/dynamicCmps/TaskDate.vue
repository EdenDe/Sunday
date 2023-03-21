<template>
  <section class="date">
    <p>{{ info }}</p>
  </section>
</template>

<script>
export default {
  name: "Date",
  props: {
    info: String,
  },
  components: {},
};
</script>
