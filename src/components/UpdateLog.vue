<template>
  <section class="update-log grid">
    <section class="editor-wrapper grid" v-clickOutside="toggleIsEditor">
      <input v-if="!isEditor" @focus="toggleIsEditor(true)" v-model="content" placeholder="Write an update..."
        class="input-update-log" />
      <TextEditor v-model="content" @setContent="setContent" v-else />
      <button class="btn-update" @click="onUpdate">Update</button>
    </section>
    <section class="updates-wrapper flex-col">
      <article class="update" v-for="update in updates">
        <div class="update-header flex">
          <Avatar :person="update.byUser" />
          <p>{{ update.byUser.fullname }}</p>
          <div class="actions-right" :class="{ active: actionMenuOpenFor === update.id }">
            <span class="update-date">
              {{ dateFormatted(update.createdAt) }}
            </span>
            <MenuIcon class="menu-icon icon" @click="
              toggleActionMenu(
                actionMenuOpenFor === update.id ? null : update.id
              )" />
          </div>
        </div>
        <div v-if="editing === update.id"></div>
        <p v-html="update.txt"></p>
        <div class="btn-container">
          <button @click="onToggleLike(update.id, likedByUser(update.likedBy))"
            :class="{ liked: likedByUser(update.likedBy) }">
            Like
          </button>
          <button>Reply</button>
        </div>
        <div class="actions-list" v-if="actionMenuOpenFor === update.id">
          <button class="actions" @click="onRemove">Delete</button>
          <button class="actions" @click="onEdit">Edit</button>
        </div>
      </article>
    </section>
  </section>
</template>

<script>
import { utilService } from '../services/util.service'
import Avatar from './Avatar.vue'
import TextEditor from './TextEditor.vue'
import MenuIcon from '../assets/icons/Menu.svg'

export default {
  name: 'UpdateLog',
  props: {
    updates: Array,
    loggedInUserId: String,
    editing: null
  },
  emits: ['addUpdate', 'toggleLike'],
  data() {
    return {
      isEditor: false,
      content: '',
      actionMenuOpenFor: null,
    }
  },
  methods: {
    toggleIsEditor(value = false) {
      if (this.content === '') {
        this.isEditor = value
      }
    },
    toggleActionMenu(value = null) {
      this.actionMenuOpenFor = value
    },
    setContent(content) {
      this.content = content
    },
    onUpdate() {
      this.$emit('addUpdate', this.content)
      this.content = ''
    },
    onToggleLike(updateId, value) {
      this.$emit('toggleLike', updateId, value)
    },
  },
  computed: {
    dateFormatted() {
      return (createdAt) => {
        return utilService.getRelativeTimeAndDay(createdAt)
      }
    },
    likedByUser() {
      return (usersLiked) => {
        return usersLiked.includes(this.loggedInUserId)
      }
    },
  },
  components: {
    TextEditor,
    Avatar,
    MenuIcon,
  },
}
</script>

<style></style>
