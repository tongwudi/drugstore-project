<template>
  <el-container style="height: 100%" direction="vertical">
    <Navbar />
    <el-container>
      <Sidebar />
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
import Navbar from '@/layout/components/Navbar'
import Sidebar from '@/layout/components/Sidebar'
import ResizeMixin from '@/mixins/ResizeMixin.js'

export default {
  mixins: [ResizeMixin],
  components: { Navbar, Sidebar },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(10).fill(item)
    }
  }
}
</script>

<style lang="less" scoped></style>
