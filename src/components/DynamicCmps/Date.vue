<template>
  <section class="date">

  </section>
</template>

<script>
export default {
  name: "Date",
  props: {
    info: Number,
  },
  created() {
    this.date = this.info;
  },
  data() {
    return {
      date: null,
    };
  },
  computed: {
    formattedDate() {
      return new Intl.DateTimeFormat("en-He", {
        month: "short",
        day: "numeric",
      }).format(this.info);
    },
  },
  components: {},
};
</script>
