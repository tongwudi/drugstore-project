<template>
  <el-container direction="vertical">
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
import { mapMutations } from 'vuex'
const WIDTH = 992

export default {
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
  },
  created() {
    this.resizeHandler()
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    ...mapMutations(['COLLAPSE_SIDEBAR','TOGGLE_SIDEBAR']),
    isMobile() {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    resizeHandler() {
      const isMobile = this.isMobile()
      console.log(isMobile)
      if (isMobile) {
        this.COLLAPSE_SIDEBAR()
      } else{
        this.TOGGLE_SIDEBAR()
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
