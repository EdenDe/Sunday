<template>
  <section class="quill-editor">
    <QuillEditor :content-type="'html'" :content="modelValue" ref="quillEditor" theme="snow" toolbar="essential"
      @text-change="onType" />
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
  methods: {
    onType() {
      let content = this.$refs.quillEditor.getText
      if (content !== '') {
        content = this.$refs.quillEditor.getHTML()
      }
      this.$emit('update:modelValue', content)
    }
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