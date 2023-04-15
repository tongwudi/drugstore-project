<template>
  <el-container style="height: 100%" direction="vertical">
    <Navbar />
    <el-container style="overflow: hidden">
      <Sidebar />
      <el-card>
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </el-card>
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
  flex: 1;
  overflow: auto;
  margin: 10px;
}

::-webkit-scrollbar-track-piece {
  background-color: #f0f2f5;
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-thumb {
  background: #d3dce6;
  border-radius: 10px;
}
</style>
