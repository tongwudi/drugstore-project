<template>
  <el-container style="height: 100%" direction="vertical">
    <Navbar />
    <el-container>
      <Sidebar />
      <!-- <el-main> -->
      <el-card>
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </el-card>
      <!-- </el-main> -->
    </el-container>
  </el-container>
</template>

<script>
import Navbar from '@/layout/components/Navbar'
import Sidebar from '@/layout/components/Sidebar'
import ResizeMixin from '@/mixins/ResizeMixin.js'

export default {
  components: { Navbar, Sidebar },
  mixins: [ResizeMixin]
}
</script>

<style lang="less" scoped>
.el-card {
  // height: 100%;
  flex: 1;
  margin: 10px;
}
</style>
