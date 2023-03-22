<template>
  <section class="date">
    <p>{{ formattedDate }}</p>
  </section>
</template>

<script>
export default {
  name: "Date",
  props: {
    info: Number,
  },
  created() {

  },
  computed: {
    formattedDate() {
      return new Intl.DateTimeFormat('en-He', { month: 'short', day: 'numeric' }).format(this.info)
    }
  },
  components: {},
};
</script>
