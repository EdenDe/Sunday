<template>
  <section class="update-log grid">
    <section class="editor-wrapper grid">
      <QuillEditor ref="quillEditor" :options="options" />
      <!-- <textarea @focus=" changeSize" :rows="rowsNum" class="textarea-update-log" v-model="content"
      placeholder="Write an update..."></textarea> -->
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
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import Avatar from './Avatar.vue'

export default {
  name: 'UpdateLog',
  props: {
    updates: Array,
    loggedInUser: Object
  },
  emits: ['addUpdate', 'toggleLike'],
  data() {
    return {
      rowsNum: 1,
      customToolbar: [
        // ["bold", "italic", "underline", "strike"],
        // [{ list: "ordered" }, { list: "bullet" }],
        // [{ 'color': ['#000000', '#11dd80'] }],
      ],
      options: {
        modules: {
          toolbar: [['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['link', 'image'],
          [{ 'align': ['left', 'center', 'right', 'justify'] }],
          [{ 'direction': 'rtl' }],
          // [{ 'table': ['table'] }],
          // ['hr'],
          // ['emoji'],
          [{ 'color': ['#ff0000', '#00ff00', '#11dd80', '#008000', '#00a359', '#00FFFF', '#ff642e', 'FF0000', '#fdab3d', '#cab641'] }]
          ],
        },
        placeholder: 'Compose an epic...',
        theme: 'bubble'
      }
    }
  },
  methods: {
    changeSize() {
      this.rowsNum = 5
    },
    onClickOut() {
      // if (this.content === '') {
      //   this.rowsNum = 1
      // }
    },
    onUpdate() {
      const content = this.$refs.quillEditor.getHTML()
      this.$emit('addUpdate', content)
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
        return usersLiked.includes(this.loggedInUser._id)
      }
    }
  },
  created() {
    console.log(this.updates)
  },
  components: {
    QuillEditor,
    Avatar
  },
}
</script>

<style></style>