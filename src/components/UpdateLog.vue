<template>
  <section class="update-log grid">
    <section class="editor-wrapper grid" v-clickOutside="toggleIsEditor">
      <input v-if="!isEditor" @focus="toggleIsEditor(true)" v-model="content" placeholder="Write an update..."
        class="input-update-log" />
      <TextEditor v-model="content" @setContent="setContent" v-else />
      <button class="btn-update" @click="onUpdate">Update</button>
    </section>
    <section class="updates-wrapper">
      <article class="update" v-for="update in updates">
        <div class="udapte-header flex">
          <Avatar :person="update.byUser" />
          <p> {{ update.byUser.fullname }} </p>
          <span class="udapte-date"> {{ dateFormatted(update.createdAt) }} </span>
        </div>
        <p v-html="update.txt"> </p>
        <div class="btn-container">
          <button @click="onToggleLike(update.id, likedByUser(update.likedBy))"
            :class="{ 'liked': likedByUser(update.likedBy) }">Like</button>
          <button>Reply</button>
        </div>
      </article>
    </section>
  </section>
</template>

<script>

import Avatar from './Avatar.vue'
import TextEditor from './TextEditor.vue'

export default {
  name: 'UpdateLog',
  props: {
    updates: Array,
    loggedInUserId: String
  },
  emits: ['addUpdate', 'toggleLike'],
  data() {
    return {
      isEditor: false,
      content: '',
      customToolbar: [
        // ["bold", "italic", "underline", "strike"],
        // [{ list: "ordered" }, { list: "bullet" }],
        // [{ 'color': ['#000000', '#11dd80'] }],
      ],
    }
  },
  methods: {
    toggleIsEditor(value = false) {
      if (this.content === '') {
        this.isEditor = value
      }
    },
    onClickOut() {
      // if (this.content === '') {
      //   this.rowsNum = 1
      // }
    },
    setContent(content) {
      this.content = content
    },
    onUpdate() {
      this.$emit('addUpdate', this.content)
    },
    onToggleLike(updateId, value) {
      this.$emit('toggleLike', updateId, value)
    }
  },

  computed: {
    dateFormatted() {
      return (createdAt) => {
        const now = new Date()
        const secondsAgo = Math.floor((now.getTime() - createdAt) / 1000)

        const daysAgo = Math.floor(secondsAgo / (3600 * 24))
        const hoursAgo = Math.floor(secondsAgo / 3600)

        if (daysAgo > 0) {
          return `${daysAgo}d`
        } else if (hoursAgo > 0) {
          return `${hoursAgo}h`
        } else {
          return 'just now'
        }
      }
    },
    likedByUser() {
      return (usersLiked) => {
        return usersLiked.includes(this.loggedInUserId)
      }
    }
  },
  created() {
    console.log(this.updates)
  },
  components: {
    TextEditor,

    Avatar
  },
}
</script>

<style></style>