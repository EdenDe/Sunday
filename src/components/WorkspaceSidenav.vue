<template>
  <section
    class="workspace-sidenav flex-col"
    ref="workspaceSidenav"
    :class="{ 'workspace-close': isWorkspaceClosed }"
  >
    <div class="toggle-workspace flex align-center" @click="toggleWorkspace">
      <i v-icon="'workspaceArrow'" class="svg workspace-arrow"></i>
    </div>

    <section class="navigation-header flex-col justify-between align-center">
      <div class="dropdown-navigation-header flex justify-between">
        <span class="dropdown-header-name">Workspace</span>
        <div class="more-menu flex">
          <i v-icon="'moreDots'"></i>
        </div>
      </div>
      <div class="dropdown-navigation-button flex justify-between align-center">
        <div class="workspace-title flex">
          <div class="workspace-icon-wrapper flex">
            <span class="icon-text flex justify-center align-center">M</span>
            <i v-icon="'workspaceHome'" class="icon-svg"></i>
          </div>
          <span class="workspace-name">Main workspace</span>
        </div>
        <div class="dropdown-arrow">
          <div class="icon-wrapper flex justify-center">
            <i v-icon="'workManagementArrowDown'"></i>
          </div>
        </div>
      </div>
    </section>

    <section class="action-list flex-col">
      <div
        class="action-item add flex align-center"
        role="button"
        @click="onAddBoard"
      >
        <i
          v-icon="'workspacePlus'"
          class="flex align-center justify-center"
        ></i>
        <span class="action-text">Add</span>
      </div>

      <div class="action-item filter flex align-center">
        <i
          v-icon="'workspaceFilter'"
          class="flex align-center justify-center"
        ></i>
        <span>Filters</span>
      </div>
      <div class="action-item search flex align-center">
        <i v-icon="'searchFilter'" class="flex align-center justify-center"></i>
        <span class="action-text">Search</span>
      </div>
    </section>
    <div class="spacer"></div>

    <ul class="board-list flex-col justify-center">
      <li
        v-for="board in boardsToDisplay"
        class="list-item flex justify-between align-center is-active"
        :class="{ 'is-active': board._id === $route.params.boardId }"
        :id="board._id"
      >
        <section class="board-name flex align-center">
          <i v-icon="'board'"></i>
          <span>{{ board.title }}</span>
        </section>
        <div class="dots-wrapper">
          <i v-icon="'workspaceDots'"></i>
        </div>
        =======
      </li>

      <li
        v-for="board in boardsToDisplay"
        class="list-item flex space-between align-center is-active"
      >
        <i v-icon="'workspaceBoard'"></i>
        <span>{{ board.title }}</span>
        >>>>>>> 017fc152f381730bb30cbff20831d007298c75f9
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "WorkspaceSidenav",
  data() {
    return {
      isWorkspaceClosed: true,
    };
  },
  methods: {
    toggleWorkspace() {
      this.isWorkspaceClosed = !this.isWorkspaceClosed;
    },
    onAddBoard() {
      this.$emit("add-board");
    },
  },
  computed: {
    boardsToDisplay() {
      return this.$store.getters.boardsToDisplay;
    },
    isActive() {
      return (boardId) => {
        console.log(boardId, this.$route);
        return true;
      };
    },
  },
};
</script>
