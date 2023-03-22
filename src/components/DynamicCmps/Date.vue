<template>
  <section class="date">
    <div class="date-picker">
      <div class="block">
        <label for="date-picker">
          {{ date }}

          <el-date-picker
            id="date-picker"
            type="date"
            placeholder="Pick a day"
            size="small"
            format="DD/MM"
            value-format="YYYY-MM-DD"
            class="date-picker-container"
            ref="date-picker"
          />
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
    showCalendar() {
      this.$refs.datePicker.pickerVisible = true;
    },
  },

  components: {},
};
</script>
