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
import TheHeader from '@/components/TheHeader'

export default {
  components: { TheHeader }
}
</script>

