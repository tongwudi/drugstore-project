<template>
  <div class="home">
    <div class="big-title">
      <span>常用药品推荐</span>
      <el-link :underline="false" class="more" @click="goDrugList">
        更多<i class="el-icon-d-arrow-right"></i>
      </el-link>
    </div>

    <el-tabs stretch v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabPanes"
        :key="item"
        :label="item"
        :name="item"
      />
    </el-tabs>

    <drug-list :list="drugList" />
  </div>
</template>

<script>
import DrugList from '@/components/DrugList'
import { getDrugList } from '@/api/drug'

export default {
  components: { DrugList },
  data() {
    return {
      tabPanes: [
        '感冒发热',
        '肠胃用药',
        '呼吸系统',
        '心脑血管',
        '妇科用药',
        '皮肤科药'
      ],
      activeName: '感冒发热',
      drugList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getDrugList({ indication: this.activeName })
      this.drugList = res.data
    },
    handleClick(e) {
      if (e.name === !this.activeName) return
      this.getList()
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
