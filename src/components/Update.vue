<template>
  <article class="update">
    <div class="update-header flex">
      <Avatar :person="update.byUser" />
      <p>{{ update.byUser.fullname }}</p>
      <div class="actions-right">
        <span class="update-date">
          {{ dateFormatted(update.createdAt) }}
        </span>
        <MenuIcon class="menu-icon icon" @click="toggleActionMenu" />
      </div>
    </div>
    <div v-if="isEditor">
      <TextEditor v-model="content" @setContent="setContent" />
      <button @click="toggleEditor">Cancel</button>
      <button @click="onSave">Save</button>
    </div>
    <p class="update-text" v-else v-html="update.txt"></p>
    <div class="btn-container">
      <button @click="onToggleLike" :class="{ liked: likeUpdate }">like</button>
      <button>Reply</button>
    </div>
    <div class="actions-list" v-if="isActionMenuOpen">
      <button class="actions" @click="$emit('removeUpdate', update.id)">
        Delete
      </button>
      <button class="actions" @click="toggleEditor">Edit</button>
    </div>
  </article>
</template>

<script>
import { utilService } from '../services/util.service'
import MenuIcon from '../assets/icons/Menu.svg'
import Avatar from './Avatar.vue'
import TextEditor from './TextEditor.vue'

export default {
  name: 'update',
  props: {
    update: Object,
    loggedInUserId: String,
  },
  data() {
    return {
      isActionMenuOpen: false,
      content: this.update.txt,
      isEditor: false,
    }
  },
  emits: ['toggleLike', 'removeUpdate', 'editUpdate'],
  methods: {
    onToggleLike() {
      this.$emit('toggleLike', this.update.id, this.likeUpdate)
    },
    toggleActionMenu() {
      this.isActionMenuOpen = !this.isActionMenuOpen
    },
    toggleEditor() {
      this.isEditor = !this.isEditor
      if (this.isEditor) {
        this.toggleActionMenu()
      }
    },
    setContent(content) {
      this.content = content
    },
    onSave() {
      this.$emit('editUpdate', this.update.id, this.content)
      this.toggleEditor()
    },
  },
  computed: {
    dateFormatted() {
      return (createdAt) => {
        return utilService.getRelativeTimeAndDay(createdAt)
      }
    },
    likeUpdate() {
      return this.update.likedBy.includes(this.loggedInUserId)
    },
  },
  created() {},
  components: {
    Avatar,
    TextEditor,
    MenuIcon,
  },
}
</script>

<style></style>
