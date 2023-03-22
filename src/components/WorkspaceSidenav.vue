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
            <i v-icon="'home'" class="icon-svg"></i>
          </div>
          <span class="workspace-name">Main Workspace</span>
        </div>
        <div class="dropdown-arrow">
          <div class="icon-wrapper flex justify-center">
            <i v-icon="'workManagementArrowDown'"></i>
          </div>
        </div>
      </div>
    </section>
    <section class="action-list flex-col">
      <div class="action-item add flex align-center justify-start">
        <div class="icon-wrapper add">
          <i
            v-icon="'workspacePlus'"
            class="flex align-center justify-center"
          ></i>
        </div>
        <span class="action-text">Add</span>
      </div>
      <div class="action-item filter flex align-center">
        <div class="icon-wrapper filter">
          <i
            v-icon="'workspaceFilter'"
            class="flex align-center justify-center"
          ></i>
        </div>
        <span>Filter</span>
      </div>
      <div class="action-item search flex align-center">
        <div class="icon-wrapper search">
          <i
            v-icon="'searchFilter'"
            class="flex align-center justify-center"
          ></i>
        </div>
        <span class="action-text">Search</span>
      </div>
    </section>
    <div class="spacer"></div>
    <ul class="board-list">
      <li class="flex space-between active-item fully"></li>
    </ul>
  </section>
</template>

<script>
import { svgService } from "../services/svg.service";
export default {
  name: "WorkspaceSidenav",
  data() {
    return {
      isWorkspaceClosed: false,
    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    toggleWorkspace() {
      this.isWorkspaceClosed = !this.isWorkspaceClosed;
    },
  },
  computed: {},
  created() {},
  components: {},
};
</script>
