<template>
  <div class="website">
    <TheHeader />

    <el-main>
      <el-card class="container">
        <router-view />
      </el-card>
    </el-main>
  </div>
</template>

<script>
import TheHeader from '@/components/website/TheHeader'

export default {
  components: { TheHeader }
}
</script>

<style lang="less">
</style>
