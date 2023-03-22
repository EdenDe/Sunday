<template>
  <section class="date">
    <div class="date-picker">
      <div class="block">
        <label for="date-picker">
          {{ formattedDate }}

          <el-date-picker id="date-picker" type="date" placeholder="Pick a day" size="small" format="DD/MM"
            value-format="YYYY-MM-DD" class="date-picker-container" ref="date-picker" />
        </label>
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
  methods: {
    onChangeDate(date) {
      this.$emit("updateProp", "date", date);
    },
  },
};
</script>
