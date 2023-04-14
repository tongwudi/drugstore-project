<template>
  <div class="drug-detail">
    <div class="drug-detail_top">
      <el-image class="image" :src="url"></el-image>
      <div class="info">
        <div class="info-name">布洛芬缓释胶囊</div>
        <div class="info-indications">适用症状：感冒发烧</div>
        <div class="info-specifications">规格：8丸*15袋</div>
        <div class="info-approval">国药准字：GJ12345678</div>
        <div class="info-manufacturer">生产厂家：江西xxxx有限公司</div>
        <div class="info-price">
          <span>价格：</span>
          <span>{{ 13 | filterPrice }}</span>
        </div>
        <div class="info-number">
          <span>数量：</span>
          <el-input-number size="mini" v-model="number" :min="1" :max="99" />
        </div>
        <div class="info-btns">
          <el-button icon="el-icon-shopping-cart-1" @click="addToCart">
            加入购物车
          </el-button>
          <el-button type="danger" icon="el-icon-shopping-bag-1" @click="goPay">
            立即购买
          </el-button>
        </div>
      </div>
    </div>
    <el-tabs stretch v-model="activeIndex">
      <el-tab-pane label="商品介绍" name="1">商品介绍</el-tab-pane>
      <el-tab-pane label="使用说明" name="2">使用说明</el-tab-pane>
      <el-tab-pane label="用户评价" name="3">用户评价</el-tab-pane>
      <el-tab-pane label="售后服务" name="4">售后服务</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      url: require('@/assets/drug.jpeg'),
      number: 1,
      activeIndex: '1'
    }
  },
  computed: {
    ...mapGetters({ isLogin: 'isWebLogin' })
  },
  methods: {
    addToCart() {
      this.$message.success('成功加入购物车！')
    },
    goPay() {
      this.$router.push({
        path: this.isLogin ? '/website/pay' : '/website/login'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.drug-detail {
  margin: 10px 25px;
  &_top {
    margin-bottom: 40px;
    display: flex;
    .image {
      width: 420px;
      padding: 20px;
      border: 1px solid @borderColor;
    }
    .info {
      margin-left: 40px;
      > div + div {
        margin-top: 20px;
        font-size: 14px;
        line-height: 20px;
        color: @textColor;
      }
      &-name {
        font-size: 18px;
        color: #000;
      }
      &-price span:last-child {
        font-size: 18px;
        color: #e50000;
      }
    }
  }
}
.el-tab-pane {
  height: 1000px;
  font-size: 48px;
  letter-spacing: 40px;
  margin: 0 auto;
  text-align: center;
  writing-mode: vertical-rl;
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
