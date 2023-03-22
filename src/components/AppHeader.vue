<template>
  <RouterLink :to="'/board/' + boardId">Boards</RouterLink>
</template>

<script>
export default {
  name: 'AppHeader',
  props: { boardId: String },
}
</script>

