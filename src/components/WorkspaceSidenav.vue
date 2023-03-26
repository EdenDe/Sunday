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
        class="list-item flex justify-between align-center"
        :class="{ 'is-active': board._id === $route.params.boardId }"
        :id="board._id"
        @click="onSetBoard(board._id)"
      >
        <section class="board-name flex align-center">
          <i v-icon="'workspaceBoard'"></i>
          <span>{{ board.title }}</span>
        </section>
        <div
          class="dots-wrapper"
          @click="
            updateModalBoardId(openModalBoardId === null ? board._id : null)
          "
        >
          <i v-icon="'workspaceDots'"></i>
        </div>
        <ul
          class="group-actions-list"
          :class="{ 'modal-open': openModalBoardId === board._id }"
        >
          <li
            class="group-action flex align-center justify-start"
            @click.prevent="onCopyBoard(board._id)"
          >
            <div class="svg-wrapper">
              <i v-icon="'duplicateAction'"></i>
            </div>
            <p>Duplicate Board</p>
          </li>
          <li
            class="group-action flex align-center justify-start"
            @click.prevent="onDeleteBoard(board._id)"
          >
            <div class="svg-wrapper">
              <i v-icon="'deleteAction'"></i>
            </div>
            <p>Delete Board</p>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'WorkspaceSidenav',
  data() {
    return {
      isWorkspaceClosed: true,
      openModalBoardId: null,
    }
  },
  emits: ['removeBoard', 'copyBoard', 'setBoard', 'addBoard'],
  methods: {
    toggleWorkspace() {
      this.isWorkspaceClosed = !this.isWorkspaceClosed
    },
    onAddBoard() {
      this.$emit('addBoard')
    },
    onSetBoard(boardId) {
      this.$emit('setBoard', boardId)
    },
    updateModalBoardId(value = null) {
      this.openModalBoardId = value
    },
    onDeleteBoard(boardId) {
      //this.$emit('removeBoard', boardId)
      this.updateModalBoardId(null)
    },
    onCopyBoard(boardId) {
      //this.$emit('copyBoard', boardId)
      this.updateModalBoardId(null)
    },
  },
  computed: {
    boardsToDisplay() {
      return this.$store.getters.boardsToDisplay
    },
    isActive() {
      return (boardId) => {
        console.log(boardId, this.$route)
        return true
      }
    },
  },
}
</script>
