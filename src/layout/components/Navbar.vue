<template>
  <el-header>
    <el-radio-group @change="changeRadio" v-model="isCollapse">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-dropdown trigger="click">
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>王小虎</span>
  </el-header>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_SIDEBAR']),
    changeRadio() {
      this.TOGGLE_SIDEBAR()
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
</style>
