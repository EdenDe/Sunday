<template>
  <section class="update-log grid">
    <section class="editor-wrapper " v-clickOutside="toggleIsEditor">
      <input v-if="!isEditor" @focus="() => toggleIsEditor(true)" @input="onType" v-model="content"
        placeholder="Write an update..." class="input-update-log" />
      <TextEditor v-model="content" @setContent="setContent" v-else />
      <div class="flex justify-between btn-container">
        <div class="emoji-container " @click="() => toggleShowEmoji(isEmojiOpen ? false : true)"
          v-clickOutside="toggleShowEmoji">
          <button class="btn flex align-center justify-between">
            <Emoji />
            Emoji
          </button>
          <picker v-if="isEmojiOpen" :data="emojiIndex" @select="addEmoji" />
        </div>
        <button class="btn-update" @click="onUpdate">Update</button>

      </div>
    </section>
    <section class="updates-wrapper flex-col">
      <h1>{{ typingUser }}</h1>
      <Update v-for="update in updates" :update="update" :key="update.id" @removeUpdate="removeUpdate"
        :loggedInUserId="loggedInUser._id" @editUpdate="editUpdate" @toggleLike="toggleLike" />
    </section>
  </section>
</template>

<script>
import Update from '../components/Update.vue'
import TextEditor from './TextEditor.vue'
import { utilService } from '../services/util.service'
import data from 'emoji-mart-vue-fast/data/twitter.json'
import 'emoji-mart-vue-fast/css/emoji-mart.css'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src'
import Emoji from '../assets/icons/Emoji.svg'

export default {
  name: 'UpdateLog',
  props: {
    updates: Array,
    loggedInUser: Object,
    taskId: String,
  },
  emits: ['editUpdates'],
  data() {
    return {
      isEditor: false,
      content: '',
      emojiIndex: new EmojiIndex(data),
      isEmojiOpen: false,
      typingUser: '',
    }
  },
  methods: {
    addEmoji(emoji) {
      this.content += emoji.native
    },
    toggleIsEditor(value = false) {
      if (this.content === '') {
        this.isEditor = value
      }
    },
    toggleShowEmoji(value = false) {
      this.isEmojiOpen = value
    },
    setContent(content) {
      this.content = content
    },
    onUpdate() {
      const updates = JSON.parse(JSON.stringify(this.updates))
      updates.unshift({
        id: 'up' + utilService.makeId(7),
        createdAt: Date.now(),
        txt: this.content,
        likedBy: [],
        byUser: { ...this.loggedInUser },
      })
      this.setContent('')
      this.toggleIsEditor()
      this.$emit('editUpdates', 'updates', updates)
    },
    removeUpdate(updateId) {
      let updates = JSON.parse(JSON.stringify(this.updates))
      updates = updates.filter((update) => update.id !== updateId)
      this.$emit('editUpdates', 'updates', updates)
    },
    toggleLike(updateId, value) {
      const updates = JSON.parse(JSON.stringify(this.updates))
      let update = updates.find((update) => update.id === updateId)
      if (value) {
        update.likedBy = update.likedBy.filter(
          (user) => user._id !== this.loggedInUser._id
        )
      } else {
        update.likedBy.push(this.loggedInUser)
      }
      this.$emit('editUpdates', 'updates', updates)
    },
    editUpdate(updateId, content) {
      const updates = JSON.parse(JSON.stringify(this.updates))
      let update = updates.find((update) => update.id === updateId)
      update.txt = content
      this.$emit('editUpdates', 'updates', updates)
    },
  },

  components: {
    TextEditor,
    Update,
    Emoji,
    Picker,
  },
}
</script>

<style></style>
