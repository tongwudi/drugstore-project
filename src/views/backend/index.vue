<template>
  <el-container>
    <el-header>
      <el-radio-group v-model="isCollapse">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    <el-container>
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

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(10).fill(item),
      isCollapse: false
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  line-height: 60px;
  background-color: #b3c0d1;
  color: #333;
}

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
