<template>
  <section class="update-log grid">
    <QuillEditor :toolbar="['strike', 'bold', 'italic', 'underline']" />
    <!-- <textarea @focus="changeSize" :rows="rowsNum" class="textarea-update-log" v-model="content"
      placeholder="Write an update..."></textarea> -->
    <button class="btn-update">Update</button>
  </section>
</template>

<script>
//import { VueEditor } from "vue2-editor";

export default {
  name: 'UpdateLog',
  data() {
    return {
      content: '',
      rowsNum: 1,
      // customToolbar: [
      //   ["bold", "italic", "underline"],
      //   [{ list: "ordered" }, { list: "bullet" }],
      //   ["image", "code-block"]
      // ]
    }
  },
  methods: {
    changeSize() {
      this.rowsNum = 5
    },
    onClickOut() {
      if (this.content === '') {
        this.rowsNum = 1
      }
    }
  },
  computed: {

  },
  created() {

  },
  components: {
    //VueEditor
  },
}
</script>

<style></style>