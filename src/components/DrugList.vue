<template>
  <el-row class="drug-list" :gutter="20">
    <el-col class="drug-item" :span="6" v-for="item in 20" :key="item">
      <div class="drug-item-box" @click="goDetail">
        <el-image :src="url"></el-image>
        <div class="info">
          <div class="info-name">药品{{ item }}</div>
          <div class="info-specification">12片x3板/盒</div>
          <div class="info-price">{{ 9 | filterPrice }}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  filters: {
    filterPrice(val) {
      return `￥ ${val}.00`
    }
  },
  methods: {
    goDetail() {
      this.$router.push({ path: '/website/drug/detail' })
    }
  }
}
</script>

<style lang="less" scoped>
.drug-list {
  padding: 0 10px;
}
.drug-item {
  &:not(:nth-child(-n + 4)) {
    margin-top: 20px;
  }
  &-box {
    padding: 10px;
    border: 1px solid @borderColor;
    transition: transform 0.2s;
    cursor: pointer;
    &:hover {
      transform: scale(1.03);
    }
    .info {
      line-height: 20px;
      font-size: 14px;
      margin-top: 5px;
      &-name {
        color: #000;
      }
      &-specification {
        font-size: 12px;
        margin: 5px 0;
        color: #999;
      }
      &-price {
        color: #e50000;
      }
    }
  }
}
</style>
