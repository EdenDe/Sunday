<template>
  <section class="group-preview-close grid-title">
    <section class="group-preview-close-first-row">
      <GroupActions />
      <div class="first-col-color" :style="{ backgroundColor: group.color, width: '6px' }"></div>
      <div class="open-list" v-tooltip="'Expand group'" style="width: 33px">
        <ArrowDownIcon class="open-list-icon icon" :style="{ fill: group.color }"
          @click="() => $emit('toggleOpenList')" />
      </div>

      <slot></slot>

      <div v-for="label in labels" :key="label.name" class="group-label group-closed" :class="label.name"
        :style="{ width: label.width }">
        {{ label.name }}
      </div>
    </section>
    <ProgressBar :tasks="group.tasks" :groupColor="group.color" :isClose="true" />
  </section>
</template>

<script>
import ProgressBar from './ProgressBar.vue'
import GroupActions from './GroupActions.vue'
//ICONS
import ArrowDownIcon from '../assets/icons/ArrowRight.svg'

export default {
  name: 'GroupPreviewClose',
  emits: ['toggleOpenList'],
  props: { group: Object },
  computed: {
    labels() {
      let labels = []
      labels.push(...this.$store.getters.cmpOrder.slice(2).map((cmp) => cmp))
      return labels.map((label) => {
        if (label === 'txt') label = 'text'
        return label
      })
    },
  },
  components: {
    ProgressBar,
    GroupActions,
    ArrowDownIcon,
  },
}
</script>
