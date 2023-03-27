<template>
  <section class="quill-editor">
    <QuillEditor ref="quillEditor" :options="options" @text-change="onType" v-focus />
  </section>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  name: 'TextEditor',
  props: {
    modelValue: String,
  },
  data() {
    return {
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
        theme: 'bubble'
      }
    }
  },
  methods: {
    onType() {
      let content = this.$refs.quillEditor.getText
      if (content !== '') {
        content = this.$refs.quillEditor.getHTML()
      }
      this.$emit('update:modelValue', content)
    }
  },
  computed: {

  },
  created() {

  },
  components: {
    QuillEditor,
  },
}
</script>

<style>
.quill-editor {
  height: fit-content
}
</style>