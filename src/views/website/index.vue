<template>
  <div class="website">
    <TheHeader />

    <el-main class="main">
      <el-card class="container">
        <router-view />
      </el-card>
    </el-main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'

export default {
  components: { TheHeader }
}
</script>

<style lang="less">
.main {
  padding-top: calc(@headerHeight + 20px) !important;
}
</style>
