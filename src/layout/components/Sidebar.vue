<template>
  <el-aside width="auto">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        :collapse="isCollapse"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">药品</span>
          </template>
          <el-menu-item index="2-1">药品管理</el-menu-item>
          <el-menu-item index="2-2">库存管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">系统</span>
          </template>
          <el-menu-item index="3-1">用户管理</el-menu-item>
          <el-menu-item index="3-2">权限管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isCollapse'])
  }
}
</script>

<style lang="less" scoped>
.el-aside {
  background-color: #304156;
}
.el-scrollbar {
  height: 100%;
  // 若没有 aside 包裹，高度会自动撑满
  // background-color: #304156;
}
.scrollbar-wrapper {
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
</style>
