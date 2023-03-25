<template>
  <section class="fileUpload" :class="{ 'is-loading': isLoading }">
    <label
      class="file-container"
      :style="{ height: '100%', width: '80%' }"
      @drop.prevent="handleFile"
      @dragover.prevent
    >
      <img
        v-if="file"
        :src="file"
        alt=""
        :style="{ height: '20px', width: '100%' }"
      />
      <div class="default-img-wrapper">
        <img
          v-if="!file"
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
import { svgService } from "../../services/svg.service";
import { uploadFile } from "../../services/upload.service";

export default {
  name: "",
  props: {
    info: String,
  },
  data() {
    return {
      fileUrl: null,
      isLoading: false,
    };
  },
  methods: {
    async handleFile(ev) {
      this.isLoading = true;
      const fileToUpload =
        ev.type === "change" ? ev.target.files[0] : ev.dataTransfer.files[0];
      try {
        const { url } = await uploadFile(fileToUpload);
        this.fileUrl = url;
        this.isLoading = false;
      } catch {
        console.log("cannot upload file");
        this.isLoading = false;
      }
    },
    getSvg(iconName) {
      return svgService.getMainMondaySvg(iconName);
    },
  },
  computed: {
    file() {
      return this.fileUrl ? this.fileUrl : "";
    },
  },
  created() {
    this.fileUrl = this.info;
  },
};
</script>

<style></style>
