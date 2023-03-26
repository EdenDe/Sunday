<template>
  <section
    class="workspace-sidenav flex-col justify-start"
    ref="workspaceSidenav"
    :class="{ 'workspace-close': isWorkspaceClosed }"
  >
    <button class="toggle-workspace flex align-center" @click="toggleWorkspace">
      <ArrowRightIcon class="arrow-right-icon icon" />
    </button>

    <section class="navigation-header flex-col justify-between align-center">
      <div class="dropdown-navigation-header flex justify-between align-center">
        <span class="dropdown-header-name">Workspace</span>
        <div class="more-menu flex">
          <MenuIcon class="menu-icon icon" />
        </div>
      </div>
      <div class="dropdown-navigation-button flex justify-between align-center">
        <div class="workspace-title flex">
          <div class="workspace-icon-wrapper flex">
            <span class="icon-text flex justify-center align-center">M</span>
            <HomeIcon class="home-icon icon" />
          </div>
          <span class="workspace-name">Main workspace</span>
        </div>

        <ArrowDownIcon class="arrow-down-icon icon" />
      </div>
    </section>

    <section class="action-list flex-col">
      <div
        class="action-item add flex align-center"
        role="button"
        @click="onAddBoard"
      >
        <AddIcon class="add-icon icon" />
        <span class="action-text">Add</span>
      </div>

      <div class="action-item filter flex align-center">
        <FilterIcon class="filter-icon icon" />
        <span>Filters</span>
      </div>
      <div class="action-item search flex align-center">
        <SearchIcon class="search-icon icon" />
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
          <BoardIcon class="board-icon icon" />
          <span>{{ board.title }}</span>
        </section>
        <div
          class="dots-wrapper"
          @click="
            updateModalBoardId(openModalBoardId === null ? board._id : null)
          "
        >
          <MenuIcon class="menu-icon icon" />
        </div>
        <ul
          class="group-actions-list"
          :class="{ 'is-modal-open': openModalBoardId === board._id }"
        >
          <li
            class="group-action flex align-center justify-start"
            @click.prevent="onCopyBoard(board._id)"
          >
            <div class="svg-wrapper">
              <DuplicateIcon class="duplicate-icon icon" />
            </div>
            <p>Duplicate Board</p>
          </li>
          <li
            class="group-action flex align-center justify-start"
            @click.prevent="onDeleteBoard(board._id)"
          >
            <div class="svg-wrapper">
              <DeleteIcon class="delete-icon icon" />
            </div>
            <p>Delete Board</p>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import AddIcon from '../assets/icons/Add.svg'
import BoardIcon from '../assets/icons/Board.svg'
import FilterIcon from '../assets/icons/Filter.svg'
import SearchIcon from '../assets/icons/Search.svg'
import HomeIcon from '../assets/icons/HomeFill.svg'
import InfoIcon from '../assets/icons/Info.svg'
import MenuIcon from '../assets/icons/Menu.svg'
import ArrowDownIcon from '../assets/icons/ArrowDown.svg'
import ArrowRightIcon from '../assets/icons/ArrowRight.svg'
import ArrowLeftIcon from '../assets/icons/ArrowLeft.svg'
import DuplicateIcon from '../assets/icons/Duplicate.svg'
import DeleteIcon from '../assets/icons/Delete.svg'
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
  components: {
    AddIcon,
    BoardIcon,
    FilterIcon,
    HomeIcon,
    InfoIcon,
    SearchIcon,
    MenuIcon,
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    DuplicateIcon,
    DeleteIcon,
  },
}
</script>
