<template>
  <section class="task-date">
    <el-date-picker
      :id="taskId + 'Date'"
      type="date"
      placeholder="Pick a day"
      size="small"
      format="MMM D"
      value-format="x"
      class="date-picker-container"
      ref="date-picker"
      v-model="date"
      @change="onChangeDate"
    />
    <i v-if="date" v-icon="'closeSmall'" @click.prevent="onRemoveDate"></i>
  </section>
</template>

<script>
export default {
  name: 'Date',
  props: {
    info: Number,
    taskId: String,
  },
  created() {
    this.date = this.info
  },
  data() {
    return {
      date: null,
    }
  },
  watch: {
    info() {
      this.date = this.info
    },
  },
  methods: {
    onChangeDate() {
      if (!this.date) return
      this.$emit('updateProp', 'date', this.date)
    },
    onRemoveDate() {
      this.$emit('updateProp', 'date', null)
    },
  },
}
</script>
