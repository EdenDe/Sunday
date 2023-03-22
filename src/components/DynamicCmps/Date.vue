<template>
  <section class="date">
    <div class="date-picker">
      <div class="block">
        <span class="demonstration">Default</span>
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="Pick a day"
          size="small"
        />
      </div>
    </div>
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
