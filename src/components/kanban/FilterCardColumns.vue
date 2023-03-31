<template>
  <section class="card-columns">
    <div class="filter-title flex align-center justify-between">
      <h4>Card Columns</h4>
      <div class="icon-wrapper">
        <InfoIcon class="icon icon-info" />
      </div>
    </div>
    <ul class="card-checkbox">
      <li
        v-for="label in checkboxLabels"
        class="flex align-end justify-between label"
      >
        <div class="checkbox-wrapper flex align-center">
          <input
            name="checkbox"
            type="checkbox"
            @change="toggleCheckBox"
            v-model="isChecked"
            class="checkbox"
            :value="label"
          />
          <span class="checkbox-txt">{{
            label === 'txt' ? 'Text' : label
          }}</span>
        </div>
        <div class="svg-wrapper">
          <component :is="`${label}Icon`" :class="`${label}-svg`"></component>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import dateIcon from '../../assets/icons/Calendar.svg'
import timelineIcon from '../../assets/icons/Timeline.svg'
import statusIcon from '../../assets/icons/StatusEmpty.svg'
import priorityIcon from '../../assets/icons/StatusEmpty.svg'
import personIcon from '../../assets/icons/PersonRound.svg'
import fileIcon from '../../assets/icons/Page.svg'
import plusIcon from '../../assets/icons/Add.svg'
import txtIcon from '../../assets/icons/Text.svg'
import InfoIcon from '../../assets/icons/Info.svg'

export default {
  name: 'FilterCardColumns',
  emits: 'setFilterCmp',
  data() {
    return {
      isChecked: [],
    }
  },
  methods: {
    toggleCheckBox() {
      this.$emit('setFilterCmp', this.isChecked)
    },
  },
  computed: {
    checkboxLabels() {
      const checkBoxLabels = this.$store.getters.cmpOrder.map((cmp) => cmp.name)
      return checkBoxLabels.slice(2, checkBoxLabels.length)
    },
  },
  created() {},
  components: {
    plusIcon,
    personIcon,
    statusIcon,
    priorityIcon,
    dateIcon,
    timelineIcon,
    txtIcon,
    fileIcon,
    InfoIcon,
  },
}
</script>

<style></style>
