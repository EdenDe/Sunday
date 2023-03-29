<template>
  <section class="update-log grid">
    <section class="editor-wrapper grid" v-clickOutside="toggleIsEditor">
      <input
        v-if="!isEditor"
        @focus="toggleIsEditor(true)"
        @input="onType"
        v-model="content"
        placeholder="Write an update..."
        class="input-update-log"
      />
      <TextEditor v-model="content" @setContent="setContent" v-else />
      <button class="btn-update" @click="onUpdate">Update</button>
    </section>
    <section class="updates-wrapper flex-col">
      <h1>{{ typingUser }}</h1>
      <Update
        v-for="update in updates"
        :update="update"
        :key="update.id"
        @removeUpdate="removeUpdate"
        :loggedInUserId="loggedInUser._id"
        @editUpdate="editUpdate"
        @toggleLike="toggleLike"
      />
    </section>
  </section>
</template>

<script>
import Update from '../components/Update.vue'
import TextEditor from './TextEditor.vue'
import { utilService } from '../services/util.service'
//SOCKETS
import {
  socketService,
  SOCKET_EMIT_SET_PULSE_TOPIC,
  SOCKET_EMIT_SEND_UPDATE,
  SOCKET_EVENT_ADD_UPDATE,
  SOCKET_EVENT_USER_IS_TYPING,
  SOCKET_EMIT_USER_IS_TYPING,
} from '../services/socket.service.js'

export default {
  name: 'UpdateLog',
  props: {
    updates: Array,
    loggedInUser: Object,
    taskId: String,
  },

  emits: ['updateTask'],

  data() {
    return {
      isEditor: false,
      content: '',
      typingUser: '',
    }
  },
  methods: {
    toggleIsEditor(value = false) {
      if (this.content === '') {
        this.isEditor = value
      }
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
      this.content = ''
      this.$emit('updateTask', 'updates', updates)
    },
    removeUpdate(updateId) {
      let updates = JSON.parse(JSON.stringify(this.updates))
      updates = updates.filter((update) => update.id !== updateId)
      this.$emit('updateTask', 'updates', updates)
    },
    toggleLike(updateId, value) {
      const updates = JSON.parse(JSON.stringify(this.updates))
      let update = updates.find((update) => update.id === updateId)
      if (value) {
        update.likedBy = update.likedBy.filter(
          (userId) => userId !== this.loggedInUser._id
        )
      } else {
        update.likedBy.push(this.loggedInUser._id)
      }
      this.$emit('updateTask', 'updates', updates)
    },
    editUpdate(updateId, content) {
      const updates = JSON.parse(JSON.stringify(this.updates))
      let update = updates.find((update) => update.id === updateId)
      update.txt = content
      this.$emit('updateTask', 'updates', updates)
    },
  },

  components: {
    TextEditor,
    Update,
  },
}
</script>

<style></style>
