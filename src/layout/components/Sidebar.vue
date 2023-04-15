<template>
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <el-button
      class="hamburger"
      type="text"
      title="折叠"
      :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="toggleSidebar"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="activeMenu"
        router
      >
        <el-menu-item index="/backend/index">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">药品</span>
          </template>
          <el-menu-item index="/backend/drug">药品管理</el-menu-item>
          <el-menu-item index="/backend/stock">库存管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">系统</span>
          </template>
          <el-menu-item index="/backend/user">用户管理</el-menu-item>
          <el-menu-item index="/backend/auth">权限管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isCollapse']),
    activeMenu() {
      const route = this.$route
      return route.path
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_SIDEBAR']),
    toggleSidebar() {
      this.TOGGLE_SIDEBAR()
    }
  }
}
</script>

<style lang="less" scoped>
.el-aside {
  transition: width 0.2s;
  background-color: #304156;
}
.el-scrollbar {
  height: calc(100% - 42px);
  // 若没有 aside 包裹，高度会自动撑满
  // background-color: #304156;
}
::v-deep(.scrollbar-wrapper) {
  overflow-x: hidden !important;
}
.el-menu {
  border-right: none;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.el-submenu .el-menu-item {
  background-color: #1f2d3d !important;
  &:hover {
    background-color: #001528 !important;
  }
}

.hamburger {
  width: 100%;
  height: 42px;
  font-size: 18px;
  padding: 0;
  border: none;
  color: #bfcbd9;
  transition: all 0.2s;
  &:hover,
  &:focus,
  &:active {
    color: #bfcbd9;
  }
  &:hover {
    background-color: #263445;
  }
}
</style>
