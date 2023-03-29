<template>
  <section class="kanban-cards grid">
    <div class="task-card grid" v-for="task in tasks">
      <h1>
        {{ task.id }}
        I'm a card
      </h1>
    </div>
  </section>
</template>
<script>
export default {
  name: 'KanbanCards',
  props: { tasks: Array },
}
</script>
