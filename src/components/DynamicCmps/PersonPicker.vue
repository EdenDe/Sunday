<template>
  <section class="person-list flex align-center justify-center">
    <i v-icon="'plusRound'" class="plus-icon" @click="isPersonPickerOpen = true">+</i>
    <PersonAvatar v-for="(member, idx) in info" :key="idx" :member="member" />
    <div v-if="isPersonPickerOpen" class="person-picker-container flex-col justify-between"
      v-clickOutside="onClosePicker">
      <div class="flex person-picker">
        <article class="flex task-member" v-for="(member, idx) in info" :key="idx">
          <PersonAvatar :member="member" />
          <span class="person-fullname">{{ member.name }}</span>
          <button class="delete-person" @click="onDelete">X</button>
        </article>
      </div>
      <input placeholder="Search names" />

    </div>
  </section>
</template>

<script>
//import vClickOutside from 'v-click-outside'
import Avatar from '../Avatar.vue'

export default {
  name: "Person",
  emits: ["update"],
  props: {
    info: Array,
  },
  data() {
    return {
      isPersonPickerOpen: false
    }
  },
  methods: {
    //   onClickOutside(event) {
    //     console.log(event)
    //     this.isPersonPickerOpen = false
    //   }
    onClosePicker() {
      this.isPersonPickerOpen = false
    }
  },
  // directives: {
  //   clickOutside: vClickOutside.directive
  // },
  components: {
    PersonAvatar: Avatar,
  },
};
</script>

