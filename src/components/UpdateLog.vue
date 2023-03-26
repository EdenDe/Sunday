<template>
  <section class="update-log grid">
    <QuillEditor :toolbar="customToolbar" table=true />
    <!-- <textarea @focus=" changeSize" :rows="rowsNum" class="textarea-update-log" v-model="content"
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
      customToolbar: [
        // ["bold", "italic", "underline", "strike"],
        // [{ list: "ordered" }, { list: "bullet" }],


        // [{ 'color': ['#000000', '#11dd80'] }],

        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        [{ 'align': ['left', 'center', 'right', 'justify'] }],
        [{ 'direction': 'rtl' }],
        [{ 'table': ['table'] }],
        ['hr'],
        [{ 'color': ['#ff0000', '#00ff00', '#11dd80', '#008000', '#00a359', '#00FFFF', '#ff642e', 'FF0000', '#fdab3d', '#cab641'] }]
      ]
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