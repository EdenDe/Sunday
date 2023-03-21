<template>
  <section class="person-list">
    <!-- <member-preview v-for="(member, idx) in info" :key="idx" :member="member" /> -->
  </section>
</template>

<script>
// import memberPreview from "./../member-preview";
export default {
  name: "Person",
  emits: ["update"],
  props: {
    info: Array,
  },

  components: {
    // memberPreview,
  },
};
</script>

