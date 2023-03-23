<template>
  <section class="fileUpload">
    <label
      :style="{ height: '100%', width: '100%' }"
      @drop.prevent="handleFile"
      @dragover.prevent
    >
      <img :src="fileUrl" alt="" />
      <input type="file" @change="handleFile" hidden />
    </label>
  </section>
</template>
<script>
import { svgService } from "../../services/svg.service";
import { uploadFile } from "../../services/upload.service";

export default {
  name: "",
  data() {
    return {
      file: null,
    };
  },
  methods: {
    async handleFile(ev) {
      const fileToUpload =
        ev.type === "change" ? ev.target.files[0] : ev.dataTransfer.files[0];
      // const { url } = await uploadFile(fileToUpload);
      // console.log(url);
    },
    getSvg(iconName) {
      return svgService.getMainMondaySvg(iconName);
    },
  },
  computed: {
    fileUrl() {
      return this.file ? this.file : this.getSvg("emptyFile");
    },
  },
  created() {},
  components: {},
};
</script>

<style></style>
