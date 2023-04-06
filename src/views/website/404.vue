<template>
  <div class="error-page">
    <el-result title="404" icon="error" subTitle="抱歉，请求错误！">
      <template slot="extra">
        <el-button type="primary" @click.once="$router.go(-1)">
          返回
        </el-button>
      </template>
    </el-result>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.error-page {
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
