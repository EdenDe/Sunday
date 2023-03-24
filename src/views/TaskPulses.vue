<template>
  <section class="task-pulse">
    <button>X</button>
    <TaskTitle />
    <img src="https://cdn.monday.com/images/pulse-page-empty-state.svg" />
  </section>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {

  },
  created() {
    console.log('pusles', this.$route)
  },
  components: {

  },
}
</script>

