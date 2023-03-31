<template>
  <article class="update">
    <div class="update-header flex">
      <Avatar :person="update.byUser" />
      <p>{{ update.byUser.fullname }}</p>
      <div class="actions-right">
        <div class="update-date flex align-center">
          <TimeIcon class="icon icon-time" />
          <span class="update-date-txt">
            {{ dateFormatted(update.createdAt) }}
          </span>
        </div>
        <MenuIcon class="menu-icon icon" @click="toggleActionMenu" />
      </div>
    </div>
    <div class="update-body" v-if="isEditor">
      <TextEditor v-model="content" @setContent="setContent" />
      <div class="btn-editor-container flex">
        <button class="btn-cancel" @click="toggleEditor">Cancel</button>
        <button class="btn-save" @click="onSave">Save</button>
      </div>
    </div>
    <template v-else>
      <p class="update-text" v-html="update.txt"></p>
      <div class="flex liked-by-container align-center">
        <Avatar v-for="person in update.likedBy" :person="person" :key="person._id" v-tooltip="person.fullname" />
        <span v-if="update.likedBy.length > 0">Liked</span>
      </div>
      <div class="btn-container">
        <button @click="onToggleLike" :class="{ liked: likeUpdate }" class="btn grid grid-col">
          <div class="icon-container">
            <ThumbsUpIcon class="thumbs-up-icon" />
          </div>
          like
        </button>
        <button class="btn grid grid-col">
          <div class="icon-container">
            <ReplayIcon class="replay-icon" />
          </div>
          Reply
        </button>
      </div>
    </template>
    <div class="actions-list" v-if="isActionMenuOpen" v-clickOutside="toggleActionMenu">
      <button class="action" @click="$emit('removeUpdate', update.id)">
        <DeleteIcon class="icon" />
        Delete
      </button>
      <button class="action" @click="toggleEditor">
        <EditIcon class="icon" />
        Edit
      </button>
    </div>
  </article>
</template>

<script>
import { utilService } from '../services/util.service'
import MenuIcon from '../assets/icons/Menu.svg'
import Avatar from './Avatar.vue'
import TextEditor from './TextEditor.vue'
//ICON
import ThumbsUpIcon from '../assets/icons/ThumbsUp.svg'
import ReplayIcon from '../assets/icons/Replay.svg'
import TimeIcon from '../assets/icons/Time.svg'
import EditIcon from '../assets/icons/Edit.svg'
import DeleteIcon from '../assets/icons/Delete.svg'
import PersonPicker from './dynamicCmps/PersonPicker.vue'
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
      return this.update.likedBy.some(user => user._id === this.loggedInUserId)
    },
  },
  created() { },
  components: {
    Avatar,
    TextEditor,
    MenuIcon,
    ThumbsUpIcon,
    ReplayIcon,
    TimeIcon,
    EditIcon,
    DeleteIcon,
    PersonPicker,
  },
}
</script>

<style></style>
