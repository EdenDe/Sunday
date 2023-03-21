<template>
  <RouterLink :to="'/board/' + boardId">Boards</RouterLink>
</template>

<script>
export default {
  name: '',
  props: { boardId: String },
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {
    // console.log(this.boardId)
  },
  components: {},
}
</script>

<style></style>
