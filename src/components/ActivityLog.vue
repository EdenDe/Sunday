<template>
  <section class="activity-log grid">
    <article class="activity grid">

    </article>
  </section>
</template>

<script>
export default {
  name: 'ActivityLog',
  props: { activities: Array },
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {

  },
  created() {
    console.log(this.activities)
  },
  components: {

  },
}
</script>

<style></style>