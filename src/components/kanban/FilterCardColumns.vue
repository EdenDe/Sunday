<template>
  <h4>Card Columns</h4>
  <ul class="card-checkbox">
    <li v-for="cmp in cmpOrder" class="flex">
      <div class="checkbox-wrapper">
        <input
          name="checkbox"
          type="checkbox"
          @change="toggleCheckBox"
          v-model="isChecked"
          class="checkbox"
          :value="cmp.name"
        />
        <span class="checkbox-txt">{{ cmp.name }}</span>
      </div>
      <div class="svg-wrapper">
        <component
          :is="`${cmp.name}Icon`"
          :class="`${cmp.name}-svg`"
        ></component>
      </div>
    </li>
  </ul>
</template>

<script>
import TimeIcon from '../../assets/icons/Time.svg'
import dateIcon from '../../assets/icons/Calendar.svg'
import timelineIcon from '../../assets/icons/Timeline.svg'
import statusIcon from '../../assets/icons/Status.svg'
import priorityIcon from '../../assets/icons/Priority.svg'
import personIcon from '../../assets/icons/PersonsWithBorder.svg'
import fileIcon from '../../assets/icons/Page.svg'
import plusIcon from '../../assets/icons/Add.svg'
import TaskTitleIcon from '../../assets/icons/Text.svg'
import txtIcon from '../../assets/icons/Text.svg'
import updatesIcon from '../../assets/icons/Text.svg'
import CreatedIcon from '../../assets/icons/AddWithBorder.svg'
import DeletedIcon from '../../assets/icons/Delete2.svg'
import ArrowRight from '../../assets/icons/ArrowRight.svg'

export default {
  name: 'FilterCardColumns',
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
    cmpOrder() {
      return this.$store.getters.cmpOrder
    },
  },
  created() {},
  components: {
    TimeIcon,
    plusIcon,
    personIcon,
    statusIcon,
    priorityIcon,
    dateIcon,
    timelineIcon,
    txtIcon,
    TaskTitleIcon,
    fileIcon,
    CreatedIcon,
    DeletedIcon,
    ArrowRight,
  },
}
</script>

<style></style>
