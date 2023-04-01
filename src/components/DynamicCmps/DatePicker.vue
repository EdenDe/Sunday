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
    <div class="remove-btn" v-if="date" @click.prevent="onRemoveDate">
      <CloseIcon class="close-icon icon" />
    </div>
    <div class="default-date" v-if="!date">
      <div class="add-icon-wrapper">
        <PlusIcon class="icon add-icon" />
      </div>
      <div class="calendar-icon-wrapper">
        <CalendarIcon class="icon icon-calendar" />
      </div>
    </div>
  </section>
</template>

<script>
import CloseIcon from '../../assets/icons/Close.svg'
import PlusIcon from '../../assets/icons/Add.svg'
import CalendarIcon from '../../assets/icons/Calendar.svg'
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
  components: {
    CloseIcon,
    PlusIcon,
    CalendarIcon,
  },
}
</script>
