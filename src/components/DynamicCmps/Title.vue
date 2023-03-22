<template>
  <section class="task-title grid">
    <span contenteditable>{{ info }}</span>
  </section>
</template>

<script>
export default {
  name: 'TaskTitle',
  props: {
    info: String,
  },
  data() {
    return {}
  },
}
</script>
