<template>
  <section v-if="person" class="avatar">
    <section v-if="person.imgUrl">
      <img :src="person.imgUrl" :alt="person.fullname" />
    </section>
    <article v-else :style="{ backgroundColor: person.color }">
      {{ person.fullname }}
    </article>
  </section>
</template>

<script>
export default {
  name: "avatar",
  props: {
    person: Object,
  },
  created() {
    console.log(this.person)
  }
};
</script>
