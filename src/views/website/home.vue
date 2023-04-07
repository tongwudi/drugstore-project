<template>
  <div class="home">
    <div class="big-title">
      <span>常用药品推荐</span>
      <el-link :underline="false" class="more" @click="goDrugList">
        更多<i class="el-icon-d-arrow-right"></i>
      </el-link>
    </div>

    <el-tabs stretch v-model="activeIndex" @tab-click="handleClick">
      <el-tab-pane label="感冒发烧" name="1"></el-tab-pane>
      <el-tab-pane label="肠胃疾病" name="2"></el-tab-pane>
      <el-tab-pane label="呼吸道类" name="3"></el-tab-pane>
      <el-tab-pane label="心脑血管" name="4"></el-tab-pane>
      <el-tab-pane label="妇科用药" name="5"></el-tab-pane>
      <el-tab-pane label="皮肤科类" name="6"></el-tab-pane>
    </el-tabs>

    <drug-list />
  </div>
</template>

<script>
import DrugList from '@/components/DrugList'

export default {
  components: { DrugList },
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleClick(e) {
      console.log(e)
    },
    goDrugList() {
      this.$router.push({ path: '/website/drug/all' })
    }
  }
}
</script>

<style lang="less" scoped>
.more {
  position: absolute;
  right: 0;
  font-size: 14px;
}

::v-deep {
  .el-tabs__nav-scroll {
    width: 60%;
    margin: 0 auto;
  }
  .el-tabs__nav-wrap::after {
    height: 1px;
  }
}
</style>
