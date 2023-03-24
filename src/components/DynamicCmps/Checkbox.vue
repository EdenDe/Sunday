<template>
  <div class="task-checkbox flex align-center justify-center">
    <input type="checkbox" @change="$emit('toggleActionBar')" />
  </div>
</template>

<script>
export default {
  name: 'TaskCheckbox',
  props: {
    info: null,
  },
}
</script>
