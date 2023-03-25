<template>
  <section class="fileUpload" :class="{ 'is-loading': isLoading }">
    <label
      class="file-container"
      :style="{ height: '100%', width: '80%' }"
      @drop.prevent="handleFile"
      @dragover.prevent
    >
      <div class="img-wrapper" v-if="file">
        <i
          v-icon="'closeSmall'"
          class="removeBtn"
          @click.prevent="onRemoveFile"
        ></i>
        <img :src="file" alt="" :style="{ height: '20px', width: '100%' }" />
      </div>
      <div class="default-img-wrapper" v-if="!file">
        <img
          src="https://cdn.monday.com/images/file-types/empty.svg"
          :style="{ height: '20px', width: '100%' }"
          class="default-img"
        />
        <i v-icon="'filePlus'"></i>
      </div>
      <input type="file" @change="handleFile" hidden />
    </label>
    <div class="loader"></div>
  </section>
</template>
<script>
import { uploadFile } from '../../services/upload.service'

export default {
  name: '',
  props: {
    info: String,
  },
  data() {
    return {
      fileUrl: null,
      isLoading: false,
    }
  },
  methods: {
    async handleFile(ev) {
      this.isLoading = true
      const fileToUpload =
        ev.type === 'change' ? ev.target.files[0] : ev.dataTransfer.files[0]
      try {
        const { url } = await uploadFile(fileToUpload)
        this.fileUrl = url
        this.isLoading = false
        this.$emit('updateProp', 'file', this.fileUrl)
      } catch {
        console.log('cannot upload file')
        this.isLoading = false
      }
    },
    onRemoveFile() {
      this.fileUrl = ''
      this.$emit('updateProp', 'file', this.fileUrl)
    },
  },

  computed: {
    file() {
      return this.fileUrl ? this.fileUrl : ''
    },
  },
  created() {
    this.fileUrl = this.info
  },
}
</script>

<style></style>
