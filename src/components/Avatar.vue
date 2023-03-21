<template>
  <section v-if="member">
    <section v-if="member.imgUrl" class="avatar">
      <img :src="member.imgUrl" alt="" />
    </section>
    <article :style="{ background: memberColor }" v-else class="member-priview">
      {{ member.name.substring(0, 1).toUpperCase() }}
    </article>
  </section>
</template>

<script>
export default {
  name: "avatar",
  props: {
    member: Object,
  },
  computed: {
    memberColor() {
      return this.member.color;
    },
  },
};
</script>
